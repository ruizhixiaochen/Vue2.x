<template>
	<div id="main">
		<div class="sku-box store-content">
			<div class="sort-option">
				<ul class="line clear">
					<li><a href="javascript:;" class="active" @click="shopTips">综合排序</a></li>
					<li><a href="javascript:;" class="" @click="shopTips">销量排序</a></li>
					<li><a href="javascript:;" class="" @click="shopTips">价格低到高</a></li>
					<li><a href="javascript:;" class="" @click="shopTips">价格高到低</a></li>
				</ul>
			</div>
			<div class="gray-box">
				<div class="item-box">
					<shop-item  v-for="item,index in goodsData" :item="item"></shop-item>
				</div>
			</div>
		</div>
		<prompt></prompt>
	</div>
</template>

<script>
import goodsData from '../lib/newGoodsData.js'
import shopItem from '../components/shop-item.vue'
import prompt from '@/components/prompt'
export default {
	data(){
		return{
			goodsData: goodsData
		}
	},
	components: {//组件自身的递归调用，就是在当前组件中，调用组件自己
		shopItem,
		prompt
	},
	methods:{
		shopTips() {
			this.$toast('功能正在开发中')
		}
	}
}
// 变异方法
// push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
// pop() 方法用于删除并返回数组的最后一个元素。
// shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
// unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
// splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
// sort() 方法用于对数组的元素进行排序。
// reverse() 方法用于颠倒数组中元素的顺序。
// 替换数组
// filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
// concat() 方法用于连接两个或多个数组。
// slice() 方法可从已有的数组中返回选定的元素。
// 其他
// split() 方法用于把一个字符串分割成字符串数组。

</script>

<style>
.sku-box{
    position: relative;
}
.sort-option{
    border-top: 1px solid #D8D8D8;
    color: #999;
}
.sort-option ul{
    height: 60px;
    line-height: 60px;
}
.sort-option li{
    position: relative;
    float: left;
    padding-left: 42px;
}
.sort-option li:first-child{
	padding-left: 9px;
}
.sort-option li:before{
	content: ' ';
    display: block;
    position: absolute;
    left: 20px;
    top: 50%;
    width: 2px;
    height: 2px;
    margin-top: -1px;
    background: #C7C7C7;
}
.sort-option li:first-child:before{
	display: none;
}
.sort-option a{
	display: block;
    font-size: 12px;
    color: #999;
}
.sort-option a.active, .sort-option a:hover{
    color: #5683EA;
}
.gray-box{
	overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0,0,0,.14);
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
}
.sku-box .item-box{
	clear: both;
    overflow: hidden;
    margin: 0 -1px -1px -1px;
}
.sku-box .item{
    position: relative;
    float: left;
    border-right: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
    width: 25%;
    height: 429px;
    background: #fff;
    box-sizing: border-box
}
.sku-box .item:hover{
	box-shadow: 0 0 38px rgba(0,0,0,.08) inset;
    transition: all .15s ease;
}
.sku-box .item .item-img img{
	display: block;
    width: 206px;
    height: 206px;
    margin: 50px auto 10px;
}
.sku-box .item h3, .sku-box .item h6{
	overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.sku-box .item h6{
    line-height: 1.2;
    font-size: 16px;
    color: #424242;
    margin: 0 auto;
    padding: 0 14px;
}
.sku-box .item h3{
	line-height: 1.2;
    font-size: 12px;
    color: #d0d0d0;
    margin: 8px auto 14px;
}
.sku-box .item .params-colors{
	margin-top: 23px;
    text-align: center;
}
.sku-box .item .colors-list{
	display: inline-block;
    overflow: hidden;
}
.sku-box .item .colors-list li{
	float: left;
    margin: 0 5px;
}
.sku-box .item .colors-list>li a{
	width: 8px;
    height: 8px;
    border: 1px solid #e5e5e5;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    padding: 2px;
    display: block;
}
.sku-box .item .colors-list>li a.active{
    box-shadow: inset 0 0 0 1px #b2b2b2;
    border-color: #b2b2b2;
}
.sku-box .item .colors-list>li img{
    width: inherit;
    height: inherit;
    border-radius: 50%;
    display: block;
}
.sku-box .item .item-btns{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 29px;
    text-align: center;
    opacity: 0;
    z-index: 10;
}
.sku-box .item:hover .item-btns{
    opacity: 1;
    transition: all .2s ease-in;
}
.sku-box .item .item-btns .item-blue-btn, .sku-box .item .item-btns .item-disabled-btn, .sku-box .item .item-btns .item-gray-btn, .sku-box .item .item-btns .item-green-btn{
	display: inline-block;
    box-sizing: border-box;
    width: 100px;
    height: 30px;
    font-size: 12px;
    line-height: 28px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 200;
    transition: all .1s ease;
}
.sku-box .item .item-btns .item-gray-btn{
	border: 1px solid #d5d5d5;
    color: #646464;
}
.sku-box .item .item-btns .item-gray-btn a{
    display: block;
    color: #a1a1a1;
}
.sku-box .item .item-btns .item-gray-btn:hover{
	background-image: linear-gradient(#f6f6f6,#ededed);
}
.sku-box .item .item-btns .item-blue-btn{
	background-color: #5c85e5;
    background-image: linear-gradient(#779ae9,#5078df);
    border: 1px solid #5c81e3;
    color: #fff;
    margin-left: 10px;
}
.sku-box .item .item-btns .item-blue-btn:hover{
	border: 1px solid #5374c8;
    background-color: #5074db;
    background-image: linear-gradient(#6e8ed5,#4769c2);
}
.sku-box .item .item-btns .item-blue-btn:active{
	border: 1px solid #3e61d7;
    background-color: #5c85e5;
    background-image: linear-gradient(#4d72de,#6189e6);
}
.sku-box .item .item-price{
	font-family: Arial;
    color: #c30a18;
    margin-top: 24px;
    text-align: center;
    opacity: 1;
}
.sku-box .item .item-price i{
    font-size: 16px;
}
.sku-box .item .item-price span{
	font-size: 18px;
    padding-left: 4px;
}
.sku-box .item:hover .item-price{
	opacity: 0;
    transition: all .1s ease-out;
}
.sku-box .item .discount-icon{
	display: none;
}
.sku-box .item .item-cover a{
	display: block;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 20;
    width: 100%;
    height: 310px;
}
</style>
