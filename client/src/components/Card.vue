<template>
    <div class="card" 
         @click="toggleFlip"
         :class="{flip: flipped}"
         v-if="current === order">
        
        <div class="front"
             
          >
            "{{post.title}}"
            <div class="click">Click to find out who says this</div>
        </div>
        <div class="back">
            ...Am I supposed to know who said this stuff?
        </div>
        
        
         
    </div>
    <div class="prev nine" v-else-if="(prev() === order) && (prev() === post.length)">
          "{{post.title}}" 
    </div>
    <div class=" prev zero" v-else-if="(next() === order) && (next() === 0)">
          "{{post.title}}" 
    </div>
    <div class="prev" v-else-if="prev() === order">
          "{{post.title}}" 
    </div>
    <div class=" next" v-else-if="next() === order">
          "{{post.title}}" 
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: ['key', 'post', 'current', 'order', 'prev', 'next'],
        data(){
            return{
                active: false,
                flipped: false
            }
        },
        methods: {
            toggleFlip: function(){
                this.flipped = !this.flipped;
            }
        }
    }
</script>

<style scoped>
.card {
    width: 300px;
    height: 190px;
    box-shadow: 1px 1px 1px 1px lightgray;
    border-radius: 5px;
    padding: 15px;
    cursor: pointer;
    backface-visibility: none;
    background: white;
    transition: .5s;
    user-select: none;
    perspective: 500;
    transform-style: preserve-3d;
    position: relative;
    z-index: 3;
}
.click{
    font-size: 10px;
    color: lightgray;
    font-style: italic;
    position: absolute;
    bottom: 10px;
}
.click:hover{
    color: gray;
}

.front {
    backface-visibility: hidden;
	position: absolute;
    z-index: 2;
	top: 0;
	left: 0;
    
    display: flex;

    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

.back {
    backface-visibility: hidden;
    transform: rotateY(180deg);
	position: absolute;
	top: 0;
	left: 0;
    display: flex;
    font-size: 12px;
    justify-content: center;
    font-style: italic;
    align-items: center;
    height: 100%;
    width: 100%;
}

.flip {
    transform: rotateY(180deg);
    box-shadow: -1px 1px 1px 1px lightgray;
}
.prev {
    transform: translate3d(-245px, 40px, -145px);
    z-index: -1;
    position: absolute;
    opacity: .65;
    width: 170px;
    height: 110px;
    box-shadow: 1px 1px 1px 1px lightgray;
    border-radius: 5px;
    padding: 15px;
    font-size: 10px;
    transition: .5s;
    background: white;

    
}

.next{
    transform: translate3d(45px, -180px, 0px);
    z-index: -2;
    position: absolute;
    opacity: .65;
    width: 170px;
    height: 110px;
    box-shadow: 1px 1px 1px 1px lightgray;
    border-radius: 5px;
    padding: 15px;
    font-size: 10px;
    transition: .5s;
    background: white;
}

.nine{
    transform: translate3d(-245px, -180px, -145px);
}

.zero{
    transform: translate3d(45px, 40px, 0);
}

</style>