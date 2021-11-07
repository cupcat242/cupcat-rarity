const axios = require('axios').default;
const fs = require('fs');
let currentPage = 0;
const allCats = [];

const getNextMetadataPageOpenSea = () => {
    /*axios.get('https://api.opensea.io/api/v1/assets', {
        params: {
            asset_contract_addresses: '0x8cd8155e1af6ad31dd9eec2ced37e04145acfcb3',
            limit: 50,
            offset: 50 * currentPage
        }
    }).then(response => {
        if (response.data.assets && response.data.assets.length) {
            allCats.push(...response.data.assets);
        } else {

        }
    });
     */
}

const getNextMetadataPageIPFS = () => {
    axios.get('https://gateway.pinata.cloud/ipfs/QmfNbw3jgvw2ku8tmTFvRGFzueWkRtgkk3ztqyi2chRzWj/' + currentPage)
        .then(response => {
            allCats.push(response.data);
            console.info('added ' + currentPage);
            currentPage++;
            setTimeout(() => {
                getNextMetadataPageIPFS();
            }, 1000);
        })
        .catch(err => {
            if (err.response && err.response.status === 404) {
                fs.writeFileSync('metadata.json', JSON.stringify(allCats));
                return
            }
            // keep hitting until it bombs, then check where we got
            console.info(err);
            console.info('bombed on: ' + currentPage);
            setTimeout(() => {
                getNextMetadataPageIPFS();
            }, 10000);
        });
}

getNextMetadataPageIPFS();
