import { useState, useEffect, Dispatch } from "react"
import PresentationCard, { Tool } from "./pres"
import Filters from "./filtering"

const SHEET_URL = 'https://sheets.googleapis.com/v4/spreadsheets/153EWt5MA0mzLMnP5FlJ15d02YZwlyERIMjdAUdZwdzU/values/'
const API_KEY = 'AIzaSyAZ61cJ1F5zWZZFZQlNvHp-RZ4nfVuM-WY' // public API key with read-only access on this sheet
const RANGE = 'tools!A:I'

const URL = SHEET_URL + RANGE + "?key=" + API_KEY




function FetchData(setData: Dispatch<Tool[]>, setFilteredData: Dispatch<Tool[]>, setLoading: Dispatch<boolean>) {

    useEffect(() => {
        setLoading(true)
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                let tools = data.values
                    .splice(1) // first line is the header of the sheet
                    .map((v: any) => new Tool(v))
                setData(tools)
                setFilteredData(tools)
                setLoading(false)
            })
    }, [])
}

function DisplayTools(data: Tool[], isLoading: boolean) {
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>Could not retrieve data  :/</p>

    return <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 auto-cols-auto gap-4 place-content-between place-items-center">
        {data.map((t: Tool, i: number) => <PresentationCard key={"tool-" + i} tool={t}></PresentationCard>)}
    </div>
}

export default function CTFTools() {

    const [data, setData] = useState<Tool[]>([])
    const [filteredData, setFilteredData] = useState<Tool[]>([])
    const [isLoading, setLoading] = useState(false)

    FetchData(setData, setFilteredData, setLoading)

    return (
        <div>
            <h1>CTF and security tools</h1>
            {Filters(data, setFilteredData)}
            {DisplayTools(filteredData, isLoading)}
        </div>
        )
}