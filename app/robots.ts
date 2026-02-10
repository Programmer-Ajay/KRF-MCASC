import { Metadata, MetadataRoute } from "next";
export default function robots():MetadataRoute.Robots{
    return{
        rules:{
            userAgent:'*', // Applies to ALL bots (Google, Bing, Yahoo),
            allow:'/',
            disallow:[
                '/admin/',
                '/coordinator/',
                '/private/',
                '/api/'
            ]
        },
        sitemap:'https://kremcasc.in/sitemap.xml'
    }
}