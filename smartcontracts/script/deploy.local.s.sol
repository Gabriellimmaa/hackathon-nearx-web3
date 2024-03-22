// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import {Script, console2} from "forge-std/Script.sol";
import {FlutterCourse} from "../src/FlutterCourse.sol";

contract Local is Script {
    FlutterCourse myFlutterCourse;

    function setUp() public {}

    function run() public {
        vm.startBroadcast(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80);

        myFlutterCourse = new FlutterCourse();
        console2.log("Counter address: ", address(myFlutterCourse));

        vm.stopBroadcast();
    }
}
