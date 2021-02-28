const { assert } = require('chai')

const ImmoDApp = artifacts.require('./ImmoDApp.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('ImmoDApp', ([deployer, author, tipper]) => {
  let immoDApp

  before(async () => {
    immoDApp = await ImmoDApp.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await immoDApp.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await immoDApp.name()
      assert.equal(name, 'ImmoDApp')
    })
  })

  describe('images', async () => {
    let result, imageCount
    const hash = 'abc123'

    before(async () => {
      result = await immoDApp.uploadImage(hash, 'Image description', {from: author})
      imageCount = await immoDApp.imageCount()
    })

    it('creates images', async () => {
      // success
      assert.equal(imageCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), imageCount.toNumber(),'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.an_address,'Image description','description is correct')
      assert.equal(event.price, '0', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')

      // fail
      await immoDApp.uploadImage('','Image description',{ from: author}).should.be.rejected;
      
      await immoDApp.uploadImage('Image hash','',{ from: author}).should.be.rejected;
      

      //result = await immoDApp.uploadImage()
      //let image = await immoDApp.images(1)
      //console.log(image)
    })
    it('lists images', async () => {
      const image = await immoDApp.images(imageCount)
      assert.equal(image.id.toNumber(), imageCount.toNumber(),'id is correct')
      assert.equal(image.hash, hash, 'Hash is correct')
      assert.equal(image.an_address,'Image description','description is correct')
      assert.equal(image.price, '0', 'tip amount is correct')
      assert.equal(image.author, author, 'author is correct')

    
    })
    it('allows users to tip images', async () => {
      // Track the author balance before purchase
      let oldAuthorBalance
      oldAuthorBalance = await web3.eth.getBalance(author)
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

      result = await immoDApp.priceImmoOwner(imageCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

      // SUCCESS
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.an_address, 'Image description', 'description is correct')
      assert.equal(event.price, '1000000000000000000', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')

      // Check that author received funds
      let newAuthorBalance
      newAuthorBalance = await web3.eth.getBalance(author)
      newAuthorBalance = new web3.utils.BN(newAuthorBalance)

      let priceImmoOwner
      priceImmoOwner = web3.utils.toWei('1', 'Ether')
      priceImmoOwner = new web3.utils.BN(priceImmoOwner)

      const expectedBalance = oldAuthorBalance.add(priceImmoOwner)

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

      // FAILURE: Tries to tip a image that does not exist
      await immoDApp.priceImmoOwner(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
    })


  })
})