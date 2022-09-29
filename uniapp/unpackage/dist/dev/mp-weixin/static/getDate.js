uni.request({
    url: 'http://127.0.0.1:8000', //仅为示例，并非真实接口地址。
    success: (res) => {
        console.log(res.data);
        this.text = 'request success';
    }
});
