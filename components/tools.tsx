import { useState, useEffect, Dispatch } from "react"
import PresentationCard, { Tool } from "./pres"
import Filters from "./filtering"

const SHEET_URL = 'https://sheets.googleapis.com/v4/spreadsheets/153EWt5MA0mzLMnP5FlJ15d02YZwlyERIMjdAUdZwdzU/values/'
const API_KEY = 'AIzaSyAZ61cJ1F5zWZZFZQlNvHp-RZ4nfVuM-WY' // public API key with read-only access on public sheets
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
    }, [setData, setFilteredData, setLoading])
}

function DisplayTools(data: Tool[], isLoading: boolean) {
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>Could not retrieve data  :/</p>

    return <div className="grid justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-7 my-10">
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
            <div className="sticky mr-3 bottom-8 ml-auto text-end opacity-80 w-fit">
                <div className="center-inside rounded-full bg-stone-600  border border-white w-8 h-8">
                    <a className="text-white" href="#">
                        <i className="fa-solid fa-caret-up"></i>
                    </a>
                </div>
                
            </div>
            <div className="h-12 pt-12">
                <a className="text-black text-small" href="https://www.flaticon.com/free-icons/logo" title="logo icons">Logo icons created by Freepik - Flaticon</a>
            </div>
        </div>
    )
}