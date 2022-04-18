const client = require("../dist/index");
const lxd = new client.default("unix:///var/snap/lxd/common/lxd/unix.socket");
const instance = lxd.instance("neat-herring");

(async function main() {
    console.log(await instance.data);
}());

