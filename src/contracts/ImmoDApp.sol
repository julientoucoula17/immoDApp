pragma solidity ^0.5.0;

contract ImmoDApp {
  string public name = "ImmoDApp";


  // Store image
  uint public imageCount = 0;
  mapping(uint=> Image) public images;

  struct Image {
    uint id;
    string hash;
    string an_address; // description
    uint price; 
    address payable author;
  }

  event ImageCreated(
    uint id,
    string hash,
    string an_address,
    uint price,
    address payable author
  );

    event ImageTipped(
    uint id,
    string hash,
    string an_address,
    uint price,
    address payable author
  );

  function uploadImage(string memory _imgHash, string memory _an_address) public {
      require(bytes(_imgHash).length > 0);
      require(bytes(_an_address).length > 0);
      require(msg.sender != address(0x0));

    // Incremente bien id
      imageCount ++;


    // Ajouter le bien aux contrats
    images[imageCount] = Image(imageCount,_imgHash,_an_address, 0, msg.sender);
  
    // trigger event
    emit ImageCreated(imageCount, _imgHash, _an_address, 0, msg.sender);
  }

  function priceImmoOwner(uint _id) public payable{
    require(_id > 0 && _id <= imageCount);
    Image memory _image = images[_id];
    address payable _author = _image.author;
    address(_author).transfer(msg.value);
    // modifier ça, ne doit pas etre incrementer
    _image.price = _image.price + msg.value;
    images[_id] = _image;

    emit ImageTipped(_id, _image.hash, _image.an_address, _image.price, _author);

  }






}