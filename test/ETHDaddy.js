const { expect } = require("chai")
const { ethers } = require("hardhat")
const { experimentalAddHardhatNetworkMessageTraceHook } = require("hardhat/config")


const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("ETHDaddy", () => {
    let ethDaddy
    let deployer, owner1

    const NAME = 'ETH Daddy'
    const SYMBOL = 'ETHD'

    beforeEach(async () => {
        //get test accounts
        [deployer, owner1] = await ethers.getSigners()

        //deploy contract
        const ETHDaddy = await ethers.getContractFactory('ETHDaddy')
        ethDaddy = await ETHDaddy.deploy('ETH Daddy', 'ETHD')

        //list a domain
        const transaction = await ethDaddy.connect(deployer).list('jack.eth', tokens(7))
        await transaction.wait()

        
    })

    describe ('Deployment', () => {
        it('has a name', async () => {
            let result = await ethDaddy.name()
            expect(result).to.equal(NAME)
        }) 
    
        it('has a symbol', async () => {
            let result = await ethDaddy.symbol()
            expect(result).to.equal(SYMBOL)
        })


        it('set the owner', async () => {
            let result = await ethDaddy.owner()
            console.log('Onwer address: ', result)
            console.log('Deployer address: ', deployer.address)
            expect(result).to.equal(deployer.address)
        })

        it('returns the max supply', async () => {
            const result = await ethDaddy.maxSupply()
            expect(result).to.equal(1)
          })
      
          it('returns the total supply', async () => {
            const result = await ethDaddy.totalSupply()
            expect(result).to.equal(0)
          })
    })

    describe ('Domain', () => {
        it('returns domain attributes', async () => {
            let domain = await ethDaddy.domains(1)
            expect(domain.name).to.be.equal('jack.eth')
            expect(domain.cost).to.be.equal(tokens(7))
            //expect(domain.isOwned).to.be.equal(false)
        })
    })

    describe ('Minting', () => {
        const ID = 1
        const AMOUNT = tokens(7)
    

        beforeEach(async () => {
            //buy a domain
            const transaction = await ethDaddy.connect(owner1).mint(ID, {value : AMOUNT})
            await transaction.wait()
        })

        it('updates the owner', async () => {
            let owner = await ethDaddy.ownerOf(ID)
            expect(owner).to.be.equal(owner1.address)
        })

        it('updates the balance', async () => {
            let balance = await ethDaddy.getBalance()
            expect(balance).to.be.equal(AMOUNT)
        })

        it('updates the total supply', async () => {
            let result = await ethDaddy.totalSupply()
            expect(result).to.be.equal(1)
        })
    })

    describe("Withdrawing", () => {
        const ID = 1
        const AMOUNT = ethers.utils.parseUnits("10", 'ether')
        let balanceBefore
    
        beforeEach(async () => {
          balanceBefore = await ethers.provider.getBalance(deployer.address)
          
    
          let transaction = await ethDaddy.connect(owner1).mint(ID, { value: AMOUNT })
          await transaction.wait()
    
          transaction = await ethDaddy.connect(deployer).withdraw()
          await transaction.wait()
        })
    
        it('updates the owner balance', async () => {
          const balanceAfter = await ethers.provider.getBalance(deployer.address)
          
          console.log("Balance After", parseInt(balanceAfter))
          console.log("Balance Before", parseInt(balanceBefore))

          //console.log("Balance After", fromWei(balanceAfter, 'ether'))
          //console.log("Balance Before", fromWei(balanceBefore, 'ether'))


          expect(parseInt(balanceAfter)).to.be.greaterThan(parseInt(balanceBefore))
        })
    
        it('updates the contract balance', async () => {
          const result = await ethDaddy.getBalance()
          expect(result).to.equal(0)
        })
      })

    }
  
   
)