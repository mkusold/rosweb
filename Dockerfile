# ==========
# Base Stage
# ==========
FROM ros:melodic-ros-core as base_stage

ARG PKG_NAME
ENV PKG_NAME=${PKG_NAME}

LABEL maintainer="M Kusold <michelle.kusold@freshconsulting.com>" description="Ros Web Project Template"

SHELL ["/bin/bash","-c"]  

ENV CATKIN_WS=/root/catkin_ws

# updating external dependencies list
RUN apt-get update && apt-get install  --no-install-recommends -y \
  python-rosdep \
  python-pip \
  # for communicating to the roslib.js library
  ros-${ROS_DISTRO}-rosbridge-suite

# update pip
RUN pip install --upgrade pip
# install necessary package for external communication
RUN pip install autobahn[twisted] pyOpenSSL tornado pymongo

# ===========
# Copy Stage
# ===========
FROM base_stage as copy_stage

# Create local catkin workspace
WORKDIR $CATKIN_WS/src
RUN mkdir -p "$PKG_NAME"

# install custom package
COPY . ./$PKG_NAME

# setting the working directory that's most useful for the other stages
WORKDIR $CATKIN_WS

# =========
# Dev Stage
# =========
FROM copy_stage as dev_stage

RUN apt-get update && apt-get install -y \
  # CLI tools
  tmux \
  nano \
  # linting and testing
  python-autopep8 \
  python-coverage \
  python-mock \
  # visualization tools
  ros-${ROS_DISTRO}-turtlesim \
  ros-${ROS_DISTRO}-rviz

# Initialize local catkin workspace
RUN source /opt/ros/${ROS_DISTRO}/setup.bash \
  # Update apt-get because its cache is always cleared after installs to keep image size down
  && apt-get update \
  # Install dependencies
  && rosdep install -y --from-paths . --ignore-src -r --rosdistro ${ROS_DISTRO} \
  # Build catkin workspace
  && catkin_make

RUN echo "source $CATKIN_WS/devel/setup.bash \
  && cd $CATKIN_WS/src/$PKG_NAME" >> ~/.bashrc

# by default hold dev container open so you can connect to it
CMD ["bash"]

# ================
# Build Stage
# ================
FROM dev_stage as build_stage
RUN source /opt/ros/${ROS_DISTRO}/setup.bash \
  && catkin_make install

# ================
# Production Stage
# ================
FROM base_stage as prod_stage

ENV PROD_WS=~/${PKG_NAME}
ENV PROD_WS_INSTALL=${PROD_WS}/install

WORKDIR $PROD_WS_INSTALL

# grabbing the built ROS packages from the build stage
COPY --from=build_stage $CATKIN_WS/install ${PROD_WS_INSTALL}
ENV CATKIN_BUILT_PKGS=${PROD_WS_INSTALL}/share

# Updating the ROS external dependency management system
RUN source /opt/ros/${ROS_DISTRO}/setup.bash \
  # Update apt-get because its cache is always cleared after installs to keep image size down
  && apt-get update \
  # Install dependencies
  && rosdep update \
  && rosdep install -y --from-paths $PROD_WS_INSTALL --ignore-src -r --rosdistro ${ROS_DISTRO} --as-root apt:false

WORKDIR $PROD_WS

RUN echo "source $PROD_WS_INSTALL/setup.bash" >> ~/.bashrc

ENTRYPOINT source ${PROD_WS_INSTALL}/setup.bash && roslaunch ${PKG_NAME}_bringup ${PKG_NAME}_bringup.launch