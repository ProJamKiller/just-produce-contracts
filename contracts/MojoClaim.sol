// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IMintableERC20 is IERC20 {
    function mint(address to, uint256 amount) external;
}

contract MojoClaim {
    IMintableERC20 public immutable mojoToken;
    address public admin;
    uint256 public constant CLAIM_AMOUNT = 100000 * 1e18;

    mapping(address => bool) public allowList;
    mapping(address => bool) public claimed;

    event AllowListAdded(address indexed user);
    event AllowListRemoved(address indexed user);
    event TokensClaimed(address indexed user, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor(IMintableERC20 _mojoToken) {
        mojoToken = _mojoToken;
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
        mojoToken.mint(msg.sender, CLAIM_AMOUNT);
        emit TokensClaimed(msg.sender, CLAIM_AMOUNT);
    }

    function changeAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
}