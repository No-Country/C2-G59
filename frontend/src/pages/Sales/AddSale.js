import { Container } from 'reactstrap';

import Breadcrumbs from '../../components/common/Breadcrumbs';

const AddSale = () => {
  const breadcrumbItems = [
    { title: 'Fintech', link: '/' },
    { title: 'Add Sale', link: '#d' },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Add Sale" breadcrumbItems={breadcrumbItems} />
        {/** Contenido Row -> Col -> etc */}
      </Container>
    </div>
  );
};

export default AddSale;
