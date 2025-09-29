// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Certificate {
    struct Cert {
        string studentName;
        string course;
        string certId;
        uint256 timestamp;
    }

    address public admin;  // Contract deployer (main admin)
    mapping(address => bool) public isCollege; // multiple colleges
    mapping(string => Cert) public certificates; // certId => Cert

    constructor() {
        admin = msg.sender; // deployer will be admin
        isCollege[msg.sender] = true; // deployer is also a college
    }

    // Admin can add more colleges
    function addCollege(address _college) public {
        require(msg.sender == admin, "Only admin can add colleges");
        isCollege[_college] = true;
    }

    // Admin can remove a college (optional)
    function removeCollege(address _college) public {
        require(msg.sender == admin, "Only admin can remove colleges");
        isCollege[_college] = false;
    }

    function addCertificate(
        string memory _studentName,
        string memory _course,
        string memory _certId
    ) public {
        require(isCollege[msg.sender], "Only authorized colleges can add certificate");
        certificates[_certId] = Cert(_studentName, _course, _certId, block.timestamp);
    }

    function verifyCertificate(string memory _certId) 
        public 
        view 
        returns (string memory, string memory, uint256) 
    {
        Cert memory c = certificates[_certId];
        require(bytes(c.certId).length != 0, "Certificate not found");
        return (c.studentName, c.course, c.timestamp);
    }
}
