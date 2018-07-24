import Document, { Head, Main, NextScript } from 'next/document'

export default class extends Document {
  render() {
    return (
      <html>
        <Head>
          <style>{`
            * {
              box-sizing: border-box;
            }
            
            body {
              padding: 0;
              margin: 0;
              overflow: hidden;
              background: #6d6464;
              color: #fff;
              font-family: SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
