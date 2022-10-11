import { useState, useEffect } from "react"
import PresentationCard, { Tool } from "./pres"

const API_KEY = 'AIzaSyAZ61cJ1F5zWZZFZQlNvHp-RZ4nfVuM-WY'
const SHEET_URL = 'https://sheets.googleapis.com/v4/spreadsheets/153EWt5MA0mzLMnP5FlJ15d02YZwlyERIMjdAUdZwdzU/values/'
const RANGE = 'tools!A:I'

const URL = SHEET_URL + RANGE + "?key=" + API_KEY


export default function CTFTools() {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            setData(data.values
                .splice(1) // first line is the header of the sheet
                .map(v => new Tool(v)))
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    
    return  <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 auto-cols-auto gap-4">
                    {data.map(i=><PresentationCard tool={i}></PresentationCard>)}
            </div>
}