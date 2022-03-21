import React, { useEffect } from 'react'
import * as d3 from 'd3';
import * as d3Color from 'd3-color'

import "./css/labColorPicker.css"
import "./css/grid.css"

interface LABPickerProps {
    lColor: number;
    aColor: number;
    bColor: number;

    lAxis: string;
    aAxis: string;
    bAxis: string;

    width: number;
    channels: any;
}








function LABPicker({ lColor, aColor, bColor, lAxis, aAxis, bAxis, channels, width }: LABPickerProps) {






    useEffect(() => {

        (document.getElementById("lAxis") as HTMLInputElement).value = lAxis;
        (document.getElementById("aAxis") as HTMLInputElement).value = aAxis;
        (document.getElementById("bAxis") as HTMLInputElement).value = bAxis;







        const channel = d3.selectAll(".channel").data(d3.entries(channels));
        const canvas = channel.select("canvas")

        canvas.each(function (d) {
            const context = this.getContext("2d");
            const image = context.createImageData(width, 1);//width = 300
            var i = -1;

            var current = d3.lab(
                lColor,
                aColor,
                bColor
            );

            for (var x = 0, c; x < 300; ++x) {
                current[d.key] = d.value.scale.invert(x);
                c = d3.rgb(current);
                //console.log(c);

                image.data[++i] = c.r;
                image.data[++i] = c.g;
                image.data[++i] = c.b;
                image.data[++i] = 255;

            }
            //console.log(image.data)
            context.putImageData(image, 0, 0);
        })


        document.querySelectorAll(".ranges").forEach(function (axis: any) {
            axis.addEventListener('input', function (event: any) {
                canvas.each(function updateRender(d) {
                    switch (d.key) {
                        case 'l':
                            d.value.x = (document.getElementById("lAxis") as HTMLInputElement).value;
                            break;
                        case 'a':
                            d.value.x = (document.getElementById("aAxis") as HTMLInputElement).value;
                            break;
                        case 'b':
                            d.value.x = (document.getElementById("bAxis") as HTMLInputElement).value;
                            break;

                    }

                    var width = this.width,
                        context = this.getContext("2d"),
                        image = context.createImageData(width, 1),
                        i = -1;


                    var current = d3.lab(
                        channels.l.scale.invert(channels.l.x),
                        channels.a.scale.invert(channels.a.x),
                        channels.b.scale.invert(channels.b.x)
                    );


                    for (var x = 0, c; x < width; ++x) {
                        current[d.key] = d.value.scale.invert(x);
                        c = d3.rgb(current);
                        //console.log(c);

                        image.data[++i] = c.r;
                        image.data[++i] = c.g;
                        image.data[++i] = c.b;
                        image.data[++i] = 255;

                    }
                    //console.log(image.data)
                    context.putImageData(image, 0, 0);

                    //context.putImageData(image, 0, 0, 0, 0, 20, 20);
                });
            }, false);
        });

    }, [lAxis, aAxis, bAxis, lColor, aColor, bColor, channels, width])


    const handleOnchange = () => {
        var current = d3.lab(
            channels.l.scale.invert(channels.l.x),
            channels.a.scale.invert(channels.a.x),
            channels.b.scale.invert(channels.b.x)
        );

        document.getElementById("currentL").innerHTML = current.l
        document.getElementById("currentA").innerHTML = current.a
        document.getElementById("currentB").innerHTML = current.b





        const currentColor: any = d3Color.lab(
            current.l,
            current.a,
            current.b
        )


        document.getElementById("hexValue").innerHTML = currentColor.formatHex().toUpperCase();
        document.getElementById("hexColor").style.backgroundColor = currentColor.formatHex();
        document.getElementById("rValue").innerHTML = formatRGB(currentColor.rgb()).r;
        document.getElementById("gValue").innerHTML = formatRGB(currentColor.rgb()).g;
        document.getElementById("bValue").innerHTML = formatRGB(currentColor.rgb()).b;
        document.getElementById("rgbValue").style.backgroundColor = currentColor.formatHex();


    }

    const color: any = d3Color.lab(lColor, aColor, bColor);

    function formatRGB(rgb: any): any {
        let { r, g, b } = rgb;
        if (r < 0) r = 0; if (r > 255) r = 255;
        if (g < 0) g = 0; if (g > 255) g = 255;
        if (b < 0) b = 0; if (b > 255) b = 255;

        return { r: Math.round(r), g: Math.round(g), b: Math.round(b), opacity: 1 };
    }

    return (
        <div className="line LABContainer">


            <div className="channel" id="l">
                <canvas id='lCanvas' width="300" height="1">
                </canvas>
                <div className='inputContainer'>
                    <input onChange={handleOnchange} id="lAxis" type="range" className="ranges" min="0" max="300" step="1" />
                </div>
            </div>

            <div className="channel" id="a">
                <canvas id='aCanvas' width="300" height="1">
                </canvas>
                <div className='inputContainer'>
                    <input onChange={handleOnchange} id="aAxis" type="range" className="ranges" min="0" max="300" step="1" />
                </div>
            </div>

            <div className="channel" id="b">
                <canvas id='bCanvas' width="300" height="1">
                </canvas>
                <div className='inputContainer'>
                    <input onChange={handleOnchange} id="bAxis" type="range" className="ranges" min="0" max="300" step="1" />
                </div>
            </div>


            <div className='colorValues' id="currentL">{lColor}</div>
            <div className='colorValues' id="currentA">{aColor}</div>
            <div className='colorValues' id="currentB">{bColor}</div>



            <div className="line colorDetailsRow">
                <div className="column-70">
                    <div className='colorDetailsContainer'>
                        <div className='colorDetailsFlex withPadding'>
                            <div className='halfWidth'>
                                <p className='HexLabel'>Hex</p>
                                <p id='hexValue'>{color.formatHex().toUpperCase()}</p>
                                <div id='hexColor' style={{ background: color.formatHex() }}></div>
                            </div>
                            <div className='halfWidth'>
                                <div className='colorDetailsFlex'>
                                    <div className='rgbContainer'>
                                        <p className='rgbLabel' >R</p>
                                    </div>
                                    <div className='rgbContainer'>
                                        <p className='rgbLabel' >G</p>
                                    </div>
                                    <div className='rgbContainer'>
                                        <p className='rgbLabel' >B</p>
                                    </div>
                                </div>
                                <div className='colorDetailsFlex'>
                                    <div id='rValue' className='rgbContainer'>{formatRGB(color.rgb()).r}</div>
                                    <div id='gValue' className='rgbContainer'>{formatRGB(color.rgb()).g}</div>
                                    <div id='bValue' className='rgbContainer'>{formatRGB(color.rgb()).b}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div id='rgbValue' className="column-30" style={{ backgroundColor: color }}>

                </div>
            </div>




        </div>
    )
}

export default LABPicker