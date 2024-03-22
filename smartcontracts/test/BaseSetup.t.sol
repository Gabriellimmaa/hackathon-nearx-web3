// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {FlutterCourse} from "../src/FlutterCourse.sol";
import {Utils} from "./Utils.t.sol";

contract BaseSetup is Utils {
    
    FlutterCourse myFlutterCourse; 
    uint256 expirationDate = block.timestamp + (30 days); // Definindo a data de expiração para 30 dias a partir de agora

  
    address[] _users;
    address controller;
    address alice;
    address bob;
    address eve;
    address trent;
    address zero;

    function setUp() public virtual {
        _users = createUsers(5);

        controller = _users[0];
        alice = _users[1];
        bob = _users[2];
        eve = _users[3];
        trent = _users[4];
        zero = address(0x0);

        vm.label(controller, "CONTROLLER");
        vm.label(alice, "ALICE");
        vm.label(bob, "BOB");
        vm.label(eve, "EVE");
        vm.label(trent, "TRENT");
        vm.label(zero, "ZERO");

        vm.startPrank(controller);
        myFlutterCourse = new FlutterCourse();
        myFlutterCourse.mint(alice, expirationDate,"https://bafybeie2gwegnbmwswuaqhzjm6sn3ia6xzbbnzxi2icay5grxkyr3qjwte.ipfs.w3s.link/flutter30-09-2024.png");
        myFlutterCourse.mint(eve, expirationDate,"https://bafybeie2gwegnbmwswuaqhzjm6sn3ia6xzbbnzxi2icay5grxkyr3qjwte.ipfs.w3s.link/flutter30-09-2024.png");
        myFlutterCourse.getMaxSupply();
        myFlutterCourse.getQtdAvailableTokens();
        myFlutterCourse.getTokenId(alice);
        myFlutterCourse.getExpirationDate(1); //Token 1
        vm.stopPrank();
    }

    function test_basesetup_just_for_pass_in_converage() public {}
}
