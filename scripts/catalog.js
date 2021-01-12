import generateSubcatalog from './generateSubcatalog.js'
import { getData } from './getData.js'

export const catalog = () => {

    const updateSubCatalog = generateSubcatalog()
    const btnBurger = document.querySelector('.btn-burger')
    const catalog = document.querySelector('.catalog')
    const subcatalog = document.querySelector('.subcatalog')
    const subcatalogHeader = document.querySelector('.subcatalog-header')
    const btnReturn = document.querySelector('.btn-return')

    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    document.body.append(overlay)

    const openMenu = () => {
        catalog.classList.add('open')
        overlay.classList.add('active')
    }

    const closeMenu = () => {
        catalog.classList.remove('open')
        overlay.classList.remove('active')
        closeSubmenu()
    }

    const handlerCatalog = (event) => {
        event.preventDefault()
        const target = event.target
        const itemList = target.closest('.catalog-list__item')
        if (itemList) {
            getData.subCatalog(target.textContent, (data) => {

                updateSubCatalog(target.textContent, data)
                subcatalog.classList.add('subopen')
            })
        }

        if (event.target.closest('.btn-close')) {
            closeMenu()
        }
    }

    const closeSubmenu = () => {
        subcatalog.classList.remove('subopen')
    }

    btnBurger.addEventListener('click', openMenu)
    overlay.addEventListener('click', closeMenu)
    catalog.addEventListener('click', handlerCatalog)
    subcatalog.addEventListener('click', (event) => {
        const btnReturn = event.target.closest('.btn-return')
        if (btnReturn) closeSubmenu()
    })


    document.addEventListener('keydown', event => {
        if (event.code === 'Escape') {
            closeMenu()
        }
    })
}