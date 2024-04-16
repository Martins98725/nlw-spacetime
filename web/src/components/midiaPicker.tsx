"use client"

import { ChangeEvent, useState } from "react"

export function MidiaPicker(){


    const [ preview, setPreview ] = useState<string | null>(null)

    function onMidiaSelected(event: ChangeEvent<HTMLInputElement>){
        const { files } = event.target

       if(!files){
        return
       }

       const previewUrl = URL.createObjectURL(files[0])

       setPreview(previewUrl)

    }

    return (
        <>        
            <input onChange={onMidiaSelected} type="file" name="coverUrl" id="midia" className="invisible h-0 w-0" accept="image/*"/>
            {preview && (
            // eslint-disable-next-line
            <img src={preview} alt="" className="w-full aspect-video rounded-lg object-cover"/>
            )}
        </>
    )
}