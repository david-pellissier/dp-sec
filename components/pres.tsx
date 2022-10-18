import Image from "next/image"
import { useState } from "react"

const CARD_W =  "min-w-[20vw] sm:min-w-[16vw]"
const CARD_H = "h-[30vh] lg:h-[32vh] lh:h-[40vh]"
const IMG_H = "min-h-[9vh] sm:min-h-[12vh]" // size of the top element of each card
const SHOWN_TAGS = (typeof window !== 'undefined') ? (window.innerWidth <= 1080 ? 2 : 3) : 1  // number of tags to appear on the summary side

enum keys {
    name, description, homepage, documentation, tags, category, platform, type, image // needs to match the order of Google Sheets columns
}

const CATEGORIES: { [name: string]: string[] } = {
    Forensics: ["border-b-cyan-400", "bg-cyan-400", "forensic.png", "forensic-bg.png"],
    Android: ["border-b-green-400", "bg-green-400", "android.png", "android-bg.png"],
    Cryptography: ["border-b-yellow-200", "bg-yellow-200", "cryptography.png", "cryptography-bg.png"],
    Misc: ["border-b-gray-400", "bg-gray-400", "misc.png", "misc-bg.png"],
    Network: ["border-b-violet-500", "bg-violet-500", "network.png", "network-bg.png"],
    OSINT: ["border-b-orange-400", "bg-orange-400", "osint.png", "osint-bg.png"],
    Pentest: ["border-b-lime-400", "bg-lime-400", "pentest.png", "pentest-bg.png"],
    Pwn: ["border-b-rose-50", "bg-rose-500", "pwn.png", "pwn-bg.png"],
    Rev: ["border-b-red-500", "bg-red-500", "rev.png", "rev-bg.png"],
    Stegano: ["border-b-blue-500", "bg-blue-500", "stegano.png", "stegano-bg.png"],
    Web: ["border-b-fuchsia-400", "bg-fuchsia-400", "web.png", "web-bg.png"],
    Cloud: ["border-b-purple-400", "bg-purple-400", "cloud.png", "cloud-bg.png"],
    Unknown: ["border-b-white", "bg-white", "unknown.png", "unknown-bg.png"]
}

const PLATFORMS: { [name: string]: string } = {
    Browser: "browser.png",
    Java: "java.png",
    Linux: "linux.png",
    "Linux/Windows": "linux-windows.png",
    Other: "other.png",
    Plugin: "plugin.png",
    Python: "python.png",
    Windows: "windows.png"
}

const TYPES: { [name: string]: string } = {
    Cheatsheet: "cheatsheet.png",
    "Lib/Framework": "framework.png",
    Guide: "guide.png",
    List: "list.png",
    Sandbox: "sandbox.png",
    Scan: "scan.png",
    Tool: "tool.png",
    Training: "training.png"
}

export class Tool {
    name: string
    description: string
    homepage: string
    documentation: Array<string>
    tags: Array<string>
    category: string
    platform: string
    type: string
    image: string | undefined
    icon: string
    color: string
    border_color: string

    constructor(arr: Array<any>) {
        this.name = arr[keys.name];
        this.description = arr[keys.description]
        this.homepage = arr[keys.homepage]
        this.documentation = arr[keys.documentation].split(',').filter((tag: string) => tag != "")
        this.tags = arr[keys.tags].split(',').filter((tag: string) => tag != "")
        this.platform = arr[keys.platform]
        this.type = arr[keys.type]
        this.category = arr[keys.category]
        this.image = arr[keys.image]

        // Next attributes may be undefined if the category is not defined
        let category_attributes = CATEGORIES[this.category]
        if (category_attributes == undefined) {
            category_attributes = CATEGORIES["Unknown"]
        }
        this.border_color = category_attributes[0]
        this.color = category_attributes[1]
        this.icon = category_attributes[2]


        // Set a default image if there is no image in the doc
        if (this.image == "") {
            this.image = category_attributes[3]
        }
    }
}

function Details(tool: any) {

    return (
        <div className="relative">
            <i className="text-white absolute top-5 right-8 z-40 fa-solid fa-magnifying-glass-minus" />
            <div className={"flex flex-col bg-stone-900 gap-4 " + CARD_W + " " + CARD_H} >
                <div className={"border-b border-b-white py-3 px-5 center-inside " + tool.color}>
                    <h3 className="text-2xl">{tool.name}</h3>
                </div>
                <div className="text-white p-6 flex flex-col">
                    <div className="pb-2">Description: <q>{tool.description}</q></div>
                    <div className="pb-2">
                        <div>Homepage: <a href={tool.homepage}>{tool.homepage}</a></div>
                        {tool.documentation.length > 0 &&
                            <div>Useful links:
                                {tool.documentation.map((link: string, id: number) => <a href={link} className="mx-0.5" key={"link-" + id}>{id}</a>)}
                            </div>
                        }
                    </div>
                    {tool.tags.length != 0 &&
                        <div>Tags: {tool.tags.map((tag: string) => <span key={tool.name + tag}>{tool.tags[tool.tags.length - 1] !== tag ? tag + ", " : tag}</span>)}</div>
                    }
                </div>
            </div>
        </div>
    )
}

function Summary(tool: any) {

    return (
        <div className="relative">
            <i className="text-white absolute top-5 right-8 z-40 fa-solid fa-magnifying-glass-plus" />
            <div className={"flex flex-col relative bg-white " + CARD_W + " " + CARD_H}>
                <div className={" bg-stone-900 border-b-4 " + IMG_H + " " + tool.border_color}></div>
                <div className="flex flex-row h-full py-4 px-4 gap-4 justify-center">
                    <div className="flex flex-col w-full">
                        <h3 className="text-2xl">{tool.name}</h3>
                        <div className="max-h-full truncate whitespace-normal leading-[18px] mb-auto py-4">{(tool.description.length > 150) ? tool.description.substr(0, 150) + "..." : tool.description}</div>
                        <div className="max-w-full truncate">
                            {tool.tags.slice(0, SHOWN_TAGS).map((tag: string) => <span key={tag} className="rounded-md bg-neutral-200 px-0.5 py-0.5 mr-2">{tag}</span>)}
                            {tool.tags.length > SHOWN_TAGS && <span className="rounded-md bg-neutral-200 px-0.5 py-0.5 mr-2">+{tool.tags.length - SHOWN_TAGS}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col h-full items-center">
                        <div className={"relative -top-10 rounded-full min-w-[50px] min-h-[50px] " + tool.color}>
                            <div className="center-inside h-full">
                                <Image height='32px' width='32px' alt={tool.category} title={tool.category} className="m-auto" layout="fixed" src={"/images/category/" + tool.icon} />
                            </div>
                        </div>
                        <div className="relative -top-4 h-full flex flex-col gap-[35px]">
                            <Image height='32px' width='32px' alt={tool.platform} title={tool.platform} src={"/images/platform/" + PLATFORMS[tool.platform]} />
                            <Image height='32px' width='32px' alt={tool.type} title={tool.type} src={"/images/type/" + TYPES[tool.type]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function PresentationCard({ tool }: any) {
    const [details, setDetails] = useState(false)

    return (
        <div onClick={_ => { setDetails(!details) }} className="shadow-2xl rounded-2xl overflow-clip min-h-full">
            {details ? Details(tool) : Summary(tool)}
        </div>)
}