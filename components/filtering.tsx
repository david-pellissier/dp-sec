import { Dispatch } from "react"
import { Tool } from "./pres"

const DEFAULT_FILTER = "all"

class Filter<T> {
    value: T
    default_value: T
    comp: (v: Tool, f: T) => boolean

    constructor(default_val: T, comp: (v: Tool, f: T) => boolean) {
        this.value = default_val;
        this.default_value = default_val;
        this.comp = comp
    }

    filter(data: Tool[]) {

        if (this.value != this.default_value) {
            return data.filter((v) => this.comp(v, this.value))
        }
        return data
    }

    setValue(value: T) {
        this.value = value
    }
}

const filter_category = new Filter<string>(DEFAULT_FILTER, (v, f) => v.category == f)
const filter_platforms = new Filter<string>(DEFAULT_FILTER, (v, f) => v.platform == f)
const filter_types = new Filter<string>(DEFAULT_FILTER, (v, f) => v.type == f)

function updateFilter(filters: Array<Filter<any>>, data: Tool[], setFilteredData: Dispatch<Tool[]>) {

    let result = data

    filters.forEach(f => {
        result = f.filter(result)
    })

    setFilteredData(result)
}


function FilterSelect(values: string[], filter: Filter<any>, filters: Filter<any>[], data: Tool[], setFilteredData: Dispatch<Tool[]>) {
    return (
        <select className="form-select appearance-none
                                block
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding bg-no-repeat
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            onChange={(v) => { filter.setValue(v.target.value); updateFilter(filters, data, setFilteredData) }}>
            <option selected value={DEFAULT_FILTER}>All</option>
            {values.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
    )
}

function Filters(data: Tool[], apply: Dispatch<Tool[]>) {

    let categories: string[] = []
    let platforms: string[] = []
    let types: string[] = []

    // initiate only once
    if (categories.length == 0) {
        let categories_temp = new Set<string>()
        let platforms_temp = new Set<string>()
        let types_temp = new Set<string>()

        data.map((t: Tool) => {
            categories_temp.add(t.category)
            platforms_temp.add(t.platform)
            types_temp.add(t.type)
        })

        categories = Array.from(categories_temp)
        platforms = Array.from(platforms_temp)
        types = Array.from(types_temp)
    }


    return (
        <div className="flex justify-end py-4 px-12">
            <h2 className="self-end w-min pr-4">Filters</h2>
            <div className="flex flex-row gap-4 justify-center w-min">
                <div>
                    <h3>Category: </h3>
                    {FilterSelect(categories, filter_category, [filter_category, filter_platforms, filter_types], data, apply)}
                </div>
                <div>
                    <h3>Platform: </h3>
                    {FilterSelect(platforms, filter_platforms, [filter_category, filter_platforms, filter_types], data, apply)}
                </div>
                <div>
                    <h3>Type: </h3>
                    {FilterSelect(types, filter_types, [filter_category, filter_platforms, filter_types], data, apply)}
                </div>
            </div>
        </div>
    )
}


export default Filters