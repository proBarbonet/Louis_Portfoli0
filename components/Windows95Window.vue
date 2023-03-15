<template>
    <div class="window" id="window95" ref="window95" style="margin: 32px; width: 500px">
        <div class="title-bar" id="window95Header" ref="window95Header">
            <div class="title-bar-text">
                My First VB4 Program
            </div>
        </div>
        <div class="window-body">
            <p>Hola! Soy Dora!</p>
        </div>
    </div>
  </template>

<script lang="ts">
export default {
    mounted() {
        dragElement(this.$refs.window95);
        
        this.window95Header = this.$refs.window95Header
        console.log(this.$refs.window95Header)
    },
    data() {
        return {
            popup: false,
            window95: HTMLElement,
            window95Header: HTMLElement,
        }
    },
    methods: {
        mouseEnter(event) {
            console.log('mouseneter');
            this.popup = true;
            this.$el.addEventListener('mousemove', this.mouseMove, false);
        },
        mouseLeave(event) {
            this.popup = false;
            // this.$el.removeEventListener('mousemove', this.mouseMove());
        },
        mouseMove(event) {
            console.log(event.clientX, event.clientY);
        }
    }
}
// Make the DIV element draggable:
// dragElement(document.getElementById("window95"));
// dragElement(this.$refs.window95);


function dragElement(elmnt: HTMLElement) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  console.log(elmnt)
  if (window95Header) {
    console.log("TESTTSTETE")
    // if present, the header is where you move the DIV from:
    window95Header.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e: MouseEvent) {

    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    console.log("pos1: " + pos1)
    console.log("pos2: " + pos2)
    console.log("pos3: " + pos3)
    console.log("pos4: " + pos4)
    
    // set the element's new position:
    // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    elmnt.style.top = (elmnt.offsetTop - e.clientY) + "px";
    elmnt.style.left = (elmnt.offsetLeft - e.clientX) + "px";
    
    console.log("Top: " + elmnt.style.top)
    console.log("Left: " + elmnt.style.left)
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
</script>

<style scoped>
#window95 {
    position: absolute;
    z-index: 9;
}

</style>