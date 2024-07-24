import {
	FacebookOutlined,
	InstagramOutlined,
	TwitterOutlined,
} from '@ant-design/icons';
import { Col, Layout, Row } from 'antd';
import React from 'react';
import './footer.css';

const { Footer } = Layout;

const FooterComponent = () => {
	return (
		<Footer className='footer'>
			<Row>
				<Col className='help-container' lg={8} md={8} sm={24} xs={24}>
					<h3>Te Ayudamos</h3>
					<ul>
						<li>Preguntas Frecuentes</li>
						<li>Contacto</li>
						<li>Soporte</li>
					</ul>
				</Col>
				<Col
					className='enterprise-container'
					lg={8}
					md={8}
					sm={24}
					xs={24}
				>
					<h3>Nuestra Empresa</h3>
					<ul>
						<li>Acerca de nosotros</li>
						<li>Misión y Visión</li>
						<li>Equipo</li>
					</ul>
				</Col>
				<Col className='rrss-container' lg={8} md={8} sm={24} xs={24}>
					<h3>Síguenos en Redes Sociales</h3>
					<ul className='social-media'>
						<li>
							<a href='#'>
								<FacebookOutlined />
							</a>
						</li>
						<li>
							<a href='#'>
								<TwitterOutlined />
							</a>
						</li>
						<li>
							<a href='#'>
								<InstagramOutlined />
							</a>
						</li>
					</ul>
				</Col>
			</Row>
			<div className='legal'>
				<p>
					<a href='#'>Términos y Condiciones</a> |{' '}
					<a href='#'>Políticas de Privacidad</a>
				</p>
				<p>
					© 2023 Nombre de la Empresa. Todos los derechos reservados.
				</p>
			</div>
		</Footer>
	);
};

export default FooterComponent;
