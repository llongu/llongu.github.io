<template>
    <div id="xmind-container">
        哈哈哈哈
    </div>
</template>
<script>
import XMindEmbedViewer from 'xmind-embed-viewer/dist/umd/xmind-embed-viewer'
export default {
    name:"Xmind",
        data() {
        return {
        }
    },
    mounted() {
        const viewer = new XMindEmbedViewer({
            el: '#xmind-container', // HTMLElement | HTMLIFrameElement | string
            // 如果在中国大陆境内速度慢，可以添加的参数 `region: 'cn'` 改为使用 xmind.cn 的图库作为依赖。
            region: 'cn' //optinal, global(default) or cn
        })
        fetch('/java/idea.xmind')
        .then(res => res.arrayBuffer())
        .then(file => viewer.load(file))
    }
}
</script>