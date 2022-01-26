import { Container } from 'reactstrap';

import Breadcrumbs from '../../components/common/Breadcrumbs';

const AddPurchase = () => {
  const breadcrumbItems = [
    { title: 'Fintech', link: '/' },
    { title: 'Add Purchase', link: '#d' },
  ];

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Add Purchase" breadcrumbItems={breadcrumbItems} />
        {/** Contenido Row -> Col -> etc */}
      </Container>
    </div>
  );
};

export default AddPurchase;
