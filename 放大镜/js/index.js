class MagnifyingGlass{
    constructor(target,scale=3,magnifierSize=400){
        this.isShow=false;
        this.scale=scale;
        this.magnifierSize=magnifierSize;
        this.$target=target;
        this.bgPosition=[0,0];
        this.magnifierPosition=[0,0];
        this.$my=null;
        this.init();
    }
    init(){
      this.bindEvent();
      this.createMagnifier();
      this.render();
    }
    bindEvent(){
        this.$target.addEventListener('click',this.toShow.bind(this));
        this.$target.addEventListener('mousemove',this.toUpdate.bind(this));
        this.$target.addEventListener('mouseout',this.toClose.bind(this));
    }
    render(){
        this.$my.style.cssText=`
        position: fixed; 
        display:${this.isShow? 'block':'none'};
        top: ${this.magnifierPosition[1]}px;
        left: ${this.magnifierPosition[0]}px;
        width: ${this.magnifierSize}px;
        height: ${this.magnifierSize}px;
        border-radius: 50%;
        box-shadow: inset 0 0 4px 8px rgba(255, 255, 255, 0.3);
        background-image: url(${this.$target.src});
        background-size: ${this.$target.clientWidth*this.scale}px auto;
        background-position: ${this.bgPosition[0]}px ${this.bgPosition[1]}px;
        background-repeat: no-repeat;
        `; 
    }
    toShow(e){
        const {offsetX,offsetY,screenX,screenY} = e;
        this.bgPosition[0]=-offsetX*this.scale + this.magnifierSize/2;
        this.bgPosition[1]=-offsetY*this.scale + this.magnifierSize/2;
        this.isShow=!this.isShow;
        this.toUpdate(e);
        this.render();
    }
    toClose(){
        this.isShow=false;
        this.render();
    }
    toUpdate(e){
        if(!this.isShow) return;
        const {offsetX,offsetY,screenX,screenY} = e;
        this.bgPosition[0]=-offsetX*this.scale + this.magnifierSize/2;
        this.bgPosition[1]=-offsetY*this.scale + this.magnifierSize/2;
        this.magnifierPosition[0]=screenX + this.magnifierSize >document.body.clientWidth ? document.body.clientWidth - this.magnifierSize : screenX;
        this.magnifierPosition[1]=screenY + this.magnifierSize >document.body.clientHeight ? document.body.clientHeight - this.magnifierSize : screenY;
        this.render();
    }
    createMagnifier(){
        const magnifier = document.createElement('div');
        this.$my=magnifier;
        document.body.appendChild(magnifier);
    }
}