import { useState, useEffect } from "react"
import PresentationCard from "./pres"

const url = 'https://sheets.googleapis.com/v4/spreadsheets/153EWt5MA0mzLMnP5FlJ15d02YZwlyERIMjdAUdZwdzU/values/tools!A1:H100?key=AIzaSyAZ61cJ1F5zWZZFZQlNvHp-RZ4nfVuM-WY'

export default function CTFTools() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setData(data)
            setLoading(false)
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return data.values.map(i=><PresentationCard tool={i}></PresentationCard>)
}
