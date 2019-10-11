<template>
    <div class="draggable">
        <div class="menu">
            <div class="title">常用</div>
            <ul>
                <li>nginx</li>
                <li>mysql</li>
            </ul>
        </div>
        <div class="menu">
            <div class="title">容器</div>
            <ul>
                <li>pod</li>
                <li>deploy</li>
            </ul>
        </div>
        <div class="menu">
            <div class="title">容器</div>
            <ul>
                <li>nginx</li>
                <li>mysql</li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: "Draggable",
    data() {
        return {}
    },
    mounted() {
        jsPlumb.draggable(jsPlumb.getSelector(".draggable .menu li"), { grid: [20, 20] });
    }
}
</script>

<style scoped>
.draggable {
    height: 100%;
    width: 14%;
    background: #f0f2f5;

    display: inline-block;
}

.draggable .menu .title, .draggable .menu li {
    padding-left: 2rem;
    line-height: 2.5rem;

    font-size: 1rem;
}

.draggable .menu .title {
    background-color: #e6f7ff;

    border-bottom: 0.05rem solid #1890ff;
}
</style>
