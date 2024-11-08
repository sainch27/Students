import './pageContent.css'

const PageContent = ({children , pageTitle = '', actions=[]}) => {
  return (
    <>
      <header>
        <h1>{pageTitle}</h1>
        <div>{...actions}</div>
      </header>
        
      <div className="containerModule">
        {children}
      </div>
    </>
  );
}

export default PageContent;