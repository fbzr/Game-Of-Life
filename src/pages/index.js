import React from "react"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import App from "../components/App"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Main" />
      <App />
    </Layout>
  )
}

export default IndexPage
