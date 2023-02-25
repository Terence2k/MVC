; (function () {
    function init() {
        model.init()  // 组织数据 + 数据监听操作   数据代理

        view.render() //组织HTML模板 渲染HTML模板
        controller.init()
    }

    var model = {
        init: function () {
            let _this = this

            for (var k in _this.data) {
                ; (
                    function (k) {
                        Object.defineProperty(_this, k, {
                            get() {
                                // console.log(_this.data[k], k, 'get')
                                // model.a  -> get
                                return _this.data[k]
                            },
                            set(newValue) {
                                // model.a = 123  -> set
                                _this.data[k] = newValue
                                view.render({ [k]: newValue })
                            }
                        })
                    }
                )(k)
            }

        },
        data: {
            a: 0,
            b: 0,
            s: '+',
            r: 0
        }
    }

    var view = {
        el: '#app',
        template: `
            <p>
                <span class='cal-a'>{{ a }}</span>
                <span class='cal-s'>{{ s }}</span>
                <span class='cal-b'>{{ b }}</span>
                <span > = </span>
                <span class='cal-r'>{{ r }}</span>
            </p>
            <p>
                <input type='text' placeholder='Number A' class='cal-input a'/>
                <input type='text' placeholder='Number B' class='cal-input b'/>
            </p>
            <p>
                <button class='cal-btn'>+</button>
                <button class='cal-btn'>-</button>
                <button class='cal-btn'>*</button>
                <button class='cal-btn'>/</button>
            </p>
        `,
        render: function (muteData) {
            // console.log(muteData, 'muteData')
            if (!muteData) {
                this.template = this.template.replace(
                    /\{\{(.*?)\}\}/g,
                    function (node, key) {
                        // console.log(node, key)
                        return model[key.trim()]
                    })
                var container = document.createElement('div')
                container.innerHTML = this.template
                document.querySelector(this.el).appendChild(container)
            } else {
                for (var k in muteData) {
                    document.querySelector('.cal-' + k).textContent = muteData[k]
                }
            }



        }
    }

    var controller = {
        init: function () {
            var oCalInputs = document.querySelectorAll('.cal-input'),
                inputItem,
                oBtns = document.querySelectorAll('.cal-btn'),
                btnItem
            for (let i = 0; i < oCalInputs.length; i++) {
                inputItem = oCalInputs[i]
                inputItem.addEventListener('input', this.handleIput, false)
            }
            for (let i = 0; i < oBtns.length; i++) {
                btnItem = oBtns[i]
                btnItem.addEventListener('click', this.handleChangeCal, false)
            }
        },
        handleIput: function (e) {
            var tar = e.target,
                value = Number(tar.value),
                field = tar.className.split(' ')[1]

            model[field] = value

            // model.r = eval('model.a' + model.s + 'model.b')

            with (model) {
                r = eval('a' + model.s + 'b')
            }
        },
        handleChangeCal: function (e) {
            let tar = e.target,
                cal = tar.textContent
            console.log(e, tar, cal)
            model.s = cal
            with (model) {
                r = eval('a' + model.s + 'b')
            }
        }
    }


    init()

})()