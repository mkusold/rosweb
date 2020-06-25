# ROS Web Project Template

This repo contains the following packages. Click on the links below to see specifics on each individual package.

* [The Ros Web Bringup Package](rosweb_bringup/README.md) which is the entry point to run this project. See this package for more details on arguments for running options.
* The Ros Web Messages Package which defines this project's custom message types

## Goal

Create an extensible base template for ROS (1) projects that integrate with web technologies.

## Conventions

1. All units are in accordance with [REP-103](https://www.ros.org/reps/rep-0103.html) unless explicitly specified.

## Setup

### Prerequisites & Configuration

1. Download and setup [docker](https://www.docker.com/get-started)

### ENV file

1. The `.env` file stores the build and run configuration for the project's docker container.
2. In particular, note the `ENV` varible in `.env` file. `ENV` could be one of `base`, `dev`, `test` or `prod`.

## Utilizing Docker

### Building the Container

Change directories into the root directory and run `docker-compose build`.

### Starting the Container

Run `docker-compose up`.

## Development

* For development and testing:
  * In the `.env` file, make sure to change the ENV variable to `dev` - Docker Compose pulls all its environment variables from this `.env` file.
  * In a separate terminal window, run `docker attach d2`
  * Go to this project's root directory (where the Makefile exists)
  * To run all packages specified in the d2_bringup launch file, run `make run`.
  * To see all make command options, simply run `make`.
* For production, change the .env `ENV` variable to `prod` and run the docker image which should auto-start

When new packages are created, add a call to its main launch file to the rosweb_bringup package's launch file.

## Testing

You can execute all tests by running `make test`.

### Unit Testing

To execute just unit tests you can run `make coverage`. Coverage reports are generated and can be viewed by opening the cover/index.html file in a browser.

To manually run one python unit test at a time you can run it like so: `python -m unittest test_config`. (note: don't include the .py)

### Node Testing

You can run an individual ROS node tes like so: `rostest sample_package.test`

## Contribution guidelines

* Unit Tests and ROS Node Tests should be written for all new code.
* All new code should go through a code review via pull requests
* Follow the team's ROS best practices
* Reference the quality checklist below and ensure your code checks off all relevant items

## Project Quality Checklist

* [ ] README Documentation
* [ ] Changelog
* [ ] Code Documentation
* [ ] Docker Capable
* [ ] Makefile scripts
* [ ] Appropriate Logging
* [ ] Configuration Files
* [ ] Multiple Environment Support
* [ ] Unit Testing
* [ ] Node Unit Testing
* [ ] Integration Testing

### Tmux Hints

* tmux comes installed if you use the Docker container
* You can use tmux to split the screen `tmux && tmux split`
* You can move between screens with `ctrl-b then [up/down arrow key]`
* You can scroll up and down with `ctrl-b then [`.
* You can quit a window with `exit`

### ROS Hints

If you're having problems running the group in development, run `catkin_make` and `source ~/catkin_ws/devel/setup.bash`
