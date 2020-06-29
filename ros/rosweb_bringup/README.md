# rosweb_bringup package

## Purpose

This is the centralized package home to the top level launch file

## Usage

### Standard Launch

```sh
roslaunch rosweb_bringup rosweb_bringup.launch
```

This will launch the entire system

### Selective Package Execution

```sh
roslaunch rosweb_bringup rosweb_bringup.launch using_webserver:=false
```

This will run the entire system except for the web server