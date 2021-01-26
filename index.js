function app() {
    return {
        content: 'hello',
        bgc: '#efefef',
        textColor: '#000000',
        generatedImages: [],
        addImage(dataUrl) {
            let img = new Image();
            img.src = dataUrl;
            this.generatedImages.push(dataUrl);
        },
        generate(text) {
            const node = document.createElement('div');
            node.classList.add('insta-pic');
            node.innerText = text;
            node.style.backgroundColor = this.bgc;
            node.style.color = this.textColor;
            const hiddenDiv = document.getElementById('hidden-div');
            hiddenDiv.appendChild(node);
            domtoimage
                .toPng(node)
                .then(this.addImage.bind(this))
                .catch(error => {
                    console.error('oops, something went wrong!', error);
                });
        },
        onGenerate() {
            this.generatedImages = [];
            let pages = this.content.trim().match(/(.|[\r\n]){1,1000}/g);

            (pages || []).forEach(this.generate.bind(this));
        },
    };
}
