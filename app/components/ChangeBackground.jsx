'use client'
import React from 'react';
import { useState, useEffect } from 'react';

const backgrounds = [
    {id:"1", image:"https://images.wallpaperscraft.ru/image/single/korabl_lajner_more_281224_1280x720.jpg" },
    {id:"2", image:"https://images.wallpaperscraft.ru/image/single/didzhej_muzyka_diskoteka_160929_1280x720.jpg" },
    {id:"3", image:"https://images.wallpaperscraft.ru/image/single/galaktika_zemlia_set_126341_1280x720.jpg" },
    {id:"4", image:"https://images.wallpaperscraft.ru/image/single/lodki_iahty_pirs_1002874_1280x720.jpg" },
    {id:"5", image:"https://images.wallpaperscraft.ru/image/single/nochnoj_gorod_vid_sverhu_ogni_goroda_134887_1280x720.jpg" },
    {id:"6", image:"https://images.wallpaperscraft.ru/image/single/siluet_noch_zvezdnoe_nebo_137292_1280x720.jpg" },
    {id:"7", image:"https://images.wallpaperscraft.ru/image/single/serfingist_volna_solntse_141888_1280x720.jpg" },
    {id:"8", image:"https://images.wallpaperscraft.ru/image/single/luna_derevo_zvezdnoe_nebo_132139_1280x720.jpg" },
    {id:"9", image:"https://images.wallpaperscraft.ru/image/single/mashina_seryj_mokryj_147750_1280x720.jpg" },
    {id:"10", image:"https://images.wallpaperscraft.ru/image/single/olen_les_noch_130294_1280x720.jpg" },
    {id:"11", image:"https://images.wallpaperscraft.ru/image/single/rozhdestvo_novyj_god_zima_130938_1280x720.jpg" },
    {id:"12", image:"https://images.wallpaperscraft.ru/image/single/kofe_kniga_ochki_140830_1280x720.jpg" },
];

const ChangeBackground = () => {
    const [currentImage, setCurrentImage] = useState(() =>
        Math.floor(Math.random() * backgrounds.length) // Случайный индекс начального изображения
    );

    const changeBackground = () => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % backgrounds.length);
    };

    useEffect(() => {
        // Полный стиль для background с центрированием и покрытием
        document.body.style.background = `url(${backgrounds[currentImage].image}) center/cover no-repeat fixed`;
        document.body.style.minHeight = '100vh';
        document.body.style.margin = '0';

        return () => {
            document.body.style.background = '';
            document.body.style.minHeight = '';
            document.body.style.margin = '';
        };
    }, [currentImage]);

    return (
        <div className="changeBackground" >
            <button onClick={changeBackground}>
                Сменить фон ({currentImage + 1}/{backgrounds.length})
            </button>
        </div>
    );
};

export default ChangeBackground;