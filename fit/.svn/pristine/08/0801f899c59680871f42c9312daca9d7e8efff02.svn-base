
export default {
    data() {
        return {
            tableData: [
            ],
            total: 0,
            heg: null,
        }
    },
    created() {
        let vm = this;
        if (this.tableUrl) {
            vm.getTable()
        }


    },
    mounted() {
        this.heg = (this.$refs.winheigt.offsetHeight - 30) * 0.9;
    },
    methods: {
        getTable() {
            let vm = this;
            vm.loadingOpen();
            let data = {
                type: vm.activeIndex,
                provinceId: 17
            }

            vm.Api[vm.tableUrl](data).then((res) => {
                if (res.code == 200) {
                    if (vm.ignore && !vm.secondIgnore) {
                        let arr = [];
                        for (let i = 0; i < res.result.length; i++) {
                            if (res.result[i][vm.ignore] > 0) {
                                arr.push(res.result[i]);
                            }

                        }

                        vm.tableData = arr;
                    } else if (vm.ignore && vm.secondIgnore) {
                        let arr = [];
                        for (let y = 0; y < res.result.length; y++) {
                            if (res.result[y][vm.ignore] > 0&& res.result[y][vm.secondIgnore] > 0) {
                                arr.push(res.result[y]);
                            }

                        }
                    }else if(vm.allignore){
                        let arr = [];
                        for (let z = 0; z < res.result.length; z++) {
                            let a = res.result[z]
                            if(a.baseStationCount!=0||a.carSum!=0||a.centerCount!=0||a.changeCabinetCount!=0||a.chargeStationCount!=0||a.defendCount!=0||a.panelCount!=0||a.shareBatteryCount!=0){
                                arr.push(res.result[z]);
                            }
                        }
                        vm.tableData = arr;
                    } else {
                        vm.tableData = res.result;
                    }

                    vm.total = vm.tableData.length;


                }
            })
        },
        pageChange(a) {
            // let vm = this;
            // vm.filter.page = a;
            // vm.getTable();
        },
        handleSelect(key, keyPath) {
            let vm = this;
            vm.activeIndex = key;
            vm.getTable();
        },
        tableClick(row) {
            let vm = this;
            this.$router.push({
                path: `/fourDetails`,
                query: {
                    shenId: 17,

                }
            });
        }


    }
}
