pragma solidity ^0.4.8;
contract StarMarket {

// You can use this hash to verify the csv file containing all the stars
    string public csvHash = "";

    address owner;

    string public standard = 'Stars';
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    uint public nextStarIndexToAssign = 0;

    bool public allStarsAssigned = false;
    uint public starsRemainingToAssign = 0;

//mapping (address => uint) public addressToStarIndex;
    mapping (uint => address) public starIndexToAddress;

/* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;

    struct Offer {
    bool isForSale;
    uint starIndex;
    address seller;
    uint minValue;          // in ether
    address onlySellTo;     // specify to sell only to a specific person
    }

    struct Bid {
    bool hasBid;
    uint starIndex;
    address bidder;
    uint value;
    }

// A record of stars that are offered for sale at a specific minimum value, and perhaps to a specific person
    mapping (uint => Offer) public starsOfferedForSale;

// A record of the highest star bid
    mapping (uint => Bid) public starBids;

    mapping (address => uint) public pendingWithdrawals;

    event Assign(address indexed to, uint256 starIndex);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event StarTransfer(address indexed from, address indexed to, uint256 starIndex);
    event StarOffered(uint indexed starIndex, uint minValue, address indexed toAddress);
    event StarBidEntered(uint indexed starIndex, uint value, address indexed fromAddress);
    event StarBidWithdrawn(uint indexed starIndex, uint value, address indexed fromAddress);
    event StarBought(uint indexed starIndex, uint value, address indexed fromAddress, address indexed toAddress);
    event StarNoLongerForSale(uint indexed starIndex);

/* Initializes contract with initial supply tokens to the creator of the contract */
    function StarMarket() payable {
    //        balanceOf[msg.sender] = initialSupply;        // Give the creator all initial tokens
        owner = msg.sender;
        totalSupply = 10000;                               // Update total supply
        starsRemainingToAssign = totalSupply;
        name = "STARS";                                     // Set the name for display purposes
        symbol = "★";                                       // Set the symbol for display purposes
        decimals = 0;                                       // Amount of decimals for display purposes
    }

    function setInitialOwner(address to, uint starIndex) {
        if (msg.sender != owner) throw;
        if (allStarsAssigned) throw;
        if (starIndex >= 10000) throw;
        if (starIndexToAddress[starIndex] != to) {
            if (starIndexToAddress[starIndex] != 0x0) {
                balanceOf[starIndexToAddress[starIndex]]--;
            } else {
                starsRemainingToAssign--;
            }
            starIndexToAddress[starIndex] = to;
            balanceOf[to]++;
            Assign(to, starIndex);
        }
    }

    function setInitialOwners(address[] addresses, uint[] indices) {
        if (msg.sender != owner) throw;
        uint n = addresses.length;
        for (uint i = 0; i < n; i++) {
            setInitialOwner(addresses[i], indices[i]);
        }
    }

    function allInitialOwnersAssigned() {
        if (msg.sender != owner) throw;
        allStarsAssigned = true;
    }

    function getStar(uint starIndex) {
        if (!allStarsAssigned) throw;
        if (starsRemainingToAssign == 0) throw;
        if (starIndexToAddress[starIndex] != 0x0) throw;
        if (starIndex >= 10000) throw;
        starIndexToAddress[starIndex] = msg.sender;
        balanceOf[msg.sender]++;
        starsRemainingToAssign--;
        Assign(msg.sender, starIndex);
    }

// Transfer ownership of a star to another user without requiring payment
    function transferStar(address to, uint starIndex) {
        if (!allStarsAssigned) throw;
        if (starIndexToAddress[starIndex] != msg.sender) throw;
        if (starIndex >= 10000) throw;
        if (starsOfferedForSale[starIndex].isForSale) {
            starNoLongerForSale(starIndex);
        }
        starIndexToAddress[starIndex] = to;
        balanceOf[msg.sender]--;
        balanceOf[to]++;
        Transfer(msg.sender, to, 1);
        StarTransfer(msg.sender, to, starIndex);
    // Check for the case where there is a bid from the new owner and refund it.
    // Any other bid can stay in place.
        Bid bid = starBids[starIndex];
        if (bid.bidder == to) {
        // Kill bid and refund value
            pendingWithdrawals[to] += bid.value;
            starBids[starIndex] = Bid(false, starIndex, 0x0, 0);
        }
    }

    function starNoLongerForSale(uint starIndex) {
        if (!allStarsAssigned) throw;
        if (starIndexToAddress[starIndex] != msg.sender) throw;
        if (starIndex >= 10000) throw;
        starsOfferedForSale[starIndex] = Offer(false, starIndex, msg.sender, 0, 0x0);
        StarNoLongerForSale(starIndex);
    }

    function offerStarForSale(uint starIndex, uint minSalePriceInWei) {
        if (!allStarsAssigned) throw;
        if (starIndexToAddress[starIndex] != msg.sender) throw;
        if (starIndex >= 10000) throw;
        starsOfferedForSale[starIndex] = Offer(true, starIndex, msg.sender, minSalePriceInWei, 0x0);
        StarOffered(starIndex, minSalePriceInWei, 0x0);
    }

    function offerStarForSaleToAddress(uint starIndex, uint minSalePriceInWei, address toAddress) {
        if (!allStarsAssigned) throw;
        if (starIndexToAddress[starIndex] != msg.sender) throw;
        if (starIndex >= 10000) throw;
        starsOfferedForSale[starIndex] = Offer(true, starIndex, msg.sender, minSalePriceInWei, toAddress);
        StarOffered(starIndex, minSalePriceInWei, toAddress);
    }

    function buyStar(uint starIndex) payable {
        if (!allStarsAssigned) throw;
        Offer offer = starsOfferedForSale[starIndex];
        if (starIndex >= 10000) throw;
        if (!offer.isForSale) throw;                // star not actually for sale
        if (offer.onlySellTo != 0x0 && offer.onlySellTo != msg.sender) throw;  // star not supposed to be sold to this user
        if (msg.value < offer.minValue) throw;      // Didn't send enough ETH
        if (offer.seller != starIndexToAddress[starIndex]) throw; // Seller no longer owner of star

        address seller = offer.seller;

        starIndexToAddress[starIndex] = msg.sender;
        balanceOf[seller]--;
        balanceOf[msg.sender]++;
        Transfer(seller, msg.sender, 1);

        starNoLongerForSale(starIndex);
        pendingWithdrawals[seller] += msg.value;
        StarBought(starIndex, msg.value, seller, msg.sender);

    // Check for the case where there is a bid from the new owner and refund it.
    // Any other bid can stay in place.
        Bid bid = starBids[starIndex];
        if (bid.bidder == msg.sender) {
        // Kill bid and refund value
            pendingWithdrawals[msg.sender] += bid.value;
            starBids[starIndex] = Bid(false, starIndex, 0x0, 0);
        }
    }

    function withdraw() {
        if (!allStarsAssigned) throw;
        uint amount = pendingWithdrawals[msg.sender];
    // Remember to zero the pending refund before
    // sending to prevent re-entrancy attacks
        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

    function enterBidForStar(uint starIndex) payable {
        if (starIndex >= 10000) throw;
        if (!allStarsAssigned) throw;
        if (starIndexToAddress[starIndex] == 0x0) throw;
        if (starIndexToAddress[starIndex] == msg.sender) throw;
        if (msg.value == 0) throw;
        Bid existing = starBids[starIndex];
        if (msg.value <= existing.value) throw;
        if (existing.value > 0) {
        // Refund the failing bid
            pendingWithdrawals[existing.bidder] += existing.value;
        }
        starBids[starIndex] = Bid(true, starIndex, msg.sender, msg.value);
        StarBidEntered(starIndex, msg.value, msg.sender);
    }

    function acceptBidForStar(uint starIndex, uint minPrice) {
        if (starIndex >= 10000) throw;
        if (!allStarsAssigned) throw;
        if (starIndexToAddress[starIndex] != msg.sender) throw;
        address seller = msg.sender;
        Bid bid = starBids[starIndex];
        if (bid.value == 0) throw;
        if (bid.value < minPrice) throw;

        starIndexToAddress[starIndex] = bid.bidder;
        balanceOf[seller]--;
        balanceOf[bid.bidder]++;
        Transfer(seller, bid.bidder, 1);

        starsOfferedForSale[starIndex] = Offer(false, starIndex, bid.bidder, 0, 0x0);
        uint amount = bid.value;
        starBids[starIndex] = Bid(false, starIndex, 0x0, 0);
        pendingWithdrawals[seller] += amount;
        StarBought(starIndex, bid.value, seller, bid.bidder);
    }

    function withdrawBidForStar(uint starIndex) {
        if (starIndex >= 10000) throw;
        if (!allStarsAssigned) throw;
        if (starIndexToAddress[starIndex] == 0x0) throw;
        if (starIndexToAddress[starIndex] == msg.sender) throw;
        Bid bid = starBids[starIndex];
        if (bid.bidder != msg.sender) throw;
        StarBidWithdrawn(starIndex, bid.value, msg.sender);
        uint amount = bid.value;
        starBids[starIndex] = Bid(false, starIndex, 0x0, 0);
    // Refund the bid money
        msg.sender.transfer(amount);
    }

}