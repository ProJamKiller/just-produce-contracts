// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@thirdweb-dev/contracts/auth/PermissionsEnumerable.sol";

interface IMojoToken {
    function mintTo(address to, uint256 amount) external;
}

contract MojoClaim is PermissionsEnumerable {
    IMojoToken public immutable mojoToken;
    uint256 public constant CLAIM_AMOUNT = 100000 * 1e18;

    mapping(address => bool) public allowList;
    mapping(address => bool) public claimed;

    event AllowListAdded(address indexed user);
    event AllowListRemoved(address indexed user);
    event TokensClaimed(address indexed user, uint256 amount);

    constructor(address _mojoToken) {
        mojoToken = IMojoToken(_mojoToken);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function addToAllowList(address user) external onlyRole(DEFAULT_ADMIN_ROLE) {
        allowList[user] = true;
        emit AllowListAdded(user);
    }

    function addMultipleToAllowList(address[] calldata users) external onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint256 i = 0; i < users.length; i++) {
            allowList[users[i]] = true;
            emit AllowListAdded(users[i]);
        }
    }

    function removeFromAllowList(address user) external onlyRole(DEFAULT_ADMIN_ROLE) {
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

    function changeAdmin(address newAdmin) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(DEFAULT_ADMIN_ROLE, newAdmin);
        _revokeRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
}