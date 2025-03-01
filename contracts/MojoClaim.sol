// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@thirdweb-dev/contracts/base/ERC20Base.sol";

contract MojoClaim {
    ERC20Base public immutable mojoToken = ERC20Base(0xf9e7D3cd71Ee60C7A3A64Fa7Fcb81e610Ce1daA5);
    address public admin;
    uint256 public constant CLAIM_AMOUNT = 100000 * 1e18; // 100,000 MOJO

    mapping(address => bool) public allowList;
    mapping(address => bool) public claimed;

    event AllowListAdded(address indexed user);
    event AllowListRemoved(address indexed user);
    event TokensClaimed(address indexed user, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addToAllowList(address user) external onlyAdmin {
        allowList[user] = true;
        emit AllowListAdded(user);
    }

    function addMultipleToAllowList(address[] calldata users) external onlyAdmin {
        for (uint256 i = 0; i < users.length; i++) {
            allowList[users[i]] = true;
            emit AllowListAdded(users[i]);
        }
    }

    function removeFromAllowList(address user) external onlyAdmin {
        allowList[user] = false;
        emit AllowListRemoved(user);
    }

    function claim() external {
        require(allowList[msg.sender], "Not on allow list");
        require(!claimed[msg.sender], "Already claimed");

        claimed[msg.sender] = true;
        mojoToken.mintTo(msg.sender, CLAIM_AMOUNT);
        emit TokensClaimed(msg.sender, CLAIM_AMOUNT);
    }

    function changeAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
}