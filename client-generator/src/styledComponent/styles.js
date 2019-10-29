export const bodyHeightWidth = `
     height: inherit
     min-height: calc( 100vh - 2.85714286em - 6px );
     width: inherit;
     min-width: 100vw;
`
export const bodyHeightJs = {
  height: "100%",
  minHeight: "calc( 100vh - 2.85714286em - 6px )"
}

export const topMenuHeightJs = "2.85714286em"

export const topMenuHeight = `
      height: 2.85714286em
`
/********* ********* ********* ********* ********* ********* ********* ********* *********
 in styled ${topMenuHeight}

 const {heightString} from 'this.filename'

 height:${heightString}

 min-height: calc( 100vh - ${heightString} - 6px );
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
