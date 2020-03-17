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

function barreiras(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
        new parDeBarreiras(altura, abertura, largura),
        new parDeBarreiras(altura, abertura, largura + espaco),
        new parDeBarreiras(altura, abertura, largura + espaco * 2),
        new parDeBarreiras(altura, abertura, largura + espaco * 3)
    ]
    
    const deslocamento = 3

    this.animar = () => {
        this.pares.forEach(par => {
            par.setPosicao(par.getPosicao() - deslocamento)

            if(par.getPosicao() < -par.getLargura()) { 
                par.setPosicao(par.getPosicao() + espaco * this.pares.length)

                par.definirAbertura() 
            }

            const meio = largura / 2
            
            const cruzouOMeio = par.getPosicao() + deslocamento >= meio && par.getPosicao() < meio
            if(cruzouOMeio) {
                notificarPonto()
            }

        })
    }
}

function passaro(alturaJogo) {
    let voando = false

    this.passaro = novoElemento("img", "passaro")
    this.passaro.src = "imagens/passaro.png"

    this.getAltura = () => parseInt(this.passaro.style.bottom.split("px")[0])
    this.setAltura = altura => this.passaro.style.bottom = `${altura}px`

    window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false 

    this.animar = () => {
        const novaAltura = this.getAltura() + (voando ? 8 : -5)
        const alturaMaxima = alturaJogo - this.passaro.clientHeight

        if (novaAltura <= 0) {
            this.setAltura(0)
        } else if (novaAltura >= alturaMaxima) {
            this.setAltura(alturaMaxima)
        } else {
            this.setAltura(novaAltura)
        }
    }
    
    this.setAltura(alturaJogo / 2)
}

function progresso(){
    this.score = novoElemento("span", "progresso")
    this.atualizarPontos = pontos => {
        this.score.innerHTML = pontos
    }

    this.atualizarPontos(0)
}

function flappyBird() {
    let pontos = 0

    const areaDoJogo = document.querySelector("[wm-flappy]")
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth
    const score = new progresso()
    const listaBarreiras = new barreiras(altura, largura, 200, 400, () => score.atualizarPontos(++pontos))
    const flappyBird = new passaro(altura)

    areaDoJogo.appendChild(score.score)
    areaDoJogo.appendChild(flappyBird.passaro)
    listaBarreiras.pares.forEach(par => areaDoJogo.appendChild(par.parDeBarreiras))

    this.start = () => {
        const temporizador = setInterval(() => {
            listaBarreiras.animar()
            flappyBird.animar()
        }, 20);
    }
}

new flappyBird().start()