function novoElemento(tagName, className) {
    const element = document.createElement(tagName)
    element.className = className
    return element
}

function barreira(reversa = false) {
    this.barreira = novoElemento("div", "barreira")

    const borda = novoElemento("div", "borda")
    const corpo = novoElemento("div", "corpo")
    
    if(reversa){
        this.barreira.appendChild(corpo)
        this.barreira.appendChild(borda)
    } else {
        this.barreira.appendChild(borda)
        this.barreira.appendChild(corpo)
    }

    this.setHeight = height => corpo.style.height = `${height}px`
}

function parDeBarreiras(altura, abertura, posicao) {
    this.parDeBarreiras = novoElemento("div", "par-de-barreiras")
    
    this.barreiraSuperior = new barreira(true)
    this.barreiraInferior = new barreira(false)

    this.parDeBarreiras.appendChild(this.barreiraSuperior.barreira)
    this.parDeBarreiras.appendChild(this.barreiraInferior.barreira)

    this.definirAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior

        this.barreiraSuperior.setHeight(alturaSuperior)
        this.barreiraInferior.setHeight(alturaInferior)
    }

    this.getPosicao = () => parseInt(this.parDeBarreiras.style.left.split("px")[0])
    this.setPosicao = posicao => this.parDeBarreiras.style.left = `${posicao}px`
    this.getLargura = () => this.parDeBarreiras.clientWidth

    this.definirAbertura()
    this.setPosicao(posicao)
}