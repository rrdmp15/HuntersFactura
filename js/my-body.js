import styles from "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" assert { type: "css" };
export class myBody extends HTMLElement {
    constructor() {
        super();
        localStorage.setItem("count", 1);
        document.adoptedStyleSheets.push(styles);
    }
    async components() {
        return await (await fetch("view/my-body.html")).text();
    }
    async add(){
        let plantilla = await (await fetch("view/my-productDetails.html")).text();
        let id = localStorage.getItem("count");
        
        let render = new DOMParser().parseFromString(plantilla, "text/html")["body"];
        render.children[0].id="product_"+id;
        let buttons = render.querySelectorAll("button");
        buttons.forEach(element => {
            element.dataset.row = "product_"+id;
        });
   
        document.querySelector("#products").insertAdjacentElement("beforeend", render.children[0]);
        id++;
        localStorage.setItem("count", id);
    }
    connectedCallback() {
        this.components().then(html => {
            this.innerHTML = html;
            this.add = this.querySelector("#add").addEventListener("click", this.add)
         
        })
    }
}
customElements.define('my-body', myBody);