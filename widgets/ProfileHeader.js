import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import { Avatar, Header } from '../components';

export default function ProfileHeader({ ...props }) {
  const router = useRouter();

  return (
    <Header {...props}>
      <Header.ImageTop src="/img/covers/profile-cover-1.jpg" alt="..." />
      <Container fluid>
        <Header.Body className="mt-n5 mt-md-n6">
          <Row className="align-items-end">
            <Col xs="auto">
              <Header.AvatarTop size="xxl">
                <Avatar.Image
                  alt="Dianna Smiley"
                  src="/img/avatars/profiles/avatar-1.jpg"
                  className="rounded-circle border border-4 border-body"
                />
              </Header.AvatarTop>
            </Col>
            <Col className="mb-3 ms-n3 ms-md-n2">
              <Header.Pretitle>Members</Header.Pretitle>
              <Header.Title>Dianna Smiley</Header.Title>
            </Col>
            <Col xs={12} md="auto" className="mt-2 mt-md-0 mb-md-3">
              <Button className="d-block d-md-inline-block w-100 lift">Subscribe</Button>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col>
              <Header.Tabs className="nav-overflow">
                <Nav.Item>
                  <Link href="/profile-posts" passHref>
                    <Nav.Link active={router.pathname === '/profile-posts'}>Posts</Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link href="/profile-groups" passHref>
                    <Nav.Link active={router.pathname === '/profile-groups'}>Groups</Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link href="/profile-projects" passHref>
                    <Nav.Link active={router.pathname === '/profile-projects'}>Projects</Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link href="/profile-files" passHref>
                    <Nav.Link active={router.pathname === '/profile-files'}>Files</Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link href="/profile-subscribers" passHref>
                    <Nav.Link active={router.pathname === '/profile-subscribers'}>Subscribers</Nav.Link>
                  </Link>
                </Nav.Item>
              </Header.Tabs>
            </Col>
          </Row>
        </Header.Body>
      </Container>
    </Header>
  );
}
