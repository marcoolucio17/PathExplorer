import React from 'react'
import './EmpleadoProyecto.css'

export const EmpleadoProyecto = () => {
  return (
    <div class="card-content flex-grow-1 min-vh-100" >
      <div class="card-body card-padding " >
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-8">
              <div class="row">
                <h1>Proyecto Pepsi</h1>
                <div style={{display: 'flex'}}>
                  <h6 style={{marginRight:'10px'}}>Creado por Perenganit</h6>
                  <img src="/img/fotogabo.jpg" style={{ borderRadius: '50%', width: '25px', height: '25px' }}></img>
                </div>
              </div>
              <br></br>
              <div className="row datos" style={{marginRight:'20px'}} >
                <h3>Datos del proyecto</h3>
                <hr></hr>
                <br></br>
                <div style={{display: 'flex', width: '100%', justifyContent:'space-between'}}>
                  <h6><strong>Cliente:</strong>   Pepsi Co.</h6>
                  <img src="/img/fotogabo.jpg" style={{ borderRadius: '50%', width: '50px', height: '50px' }}></img>
                </div>
                <h6>Fecha Inicio:</h6>
                <h6>Fecha Fin Estimada:</h6>
                <br></br>
                <div className="cuadrito">
                  <h6>Descripción de Proyecto</h6>
                  <h7>Pepsi está buscando una aplicación móvil que le permita a sus clientes interactuar
                    como una red social, en la que se puedan compartir fotos, conectar con otras personas, y ver actualizaciones 
                    de sus nuevos productos. 
                    <br></br>
                    <br></br>
                    El entregable final incluye lo siguiente: 
                    <ul>
                      <li>Una aplicación móvil, funcional para Andriod y iOS.</li>
                      <li>Aplicación de backend, que administre la información de los usuarios y sus publicaciones.</li>
                      <li>Base de datos que almacene la información de sus usuarios.</li>
                      <li>Página web de administrador para uso interno de Pepsi, para moderación de la apilcación. </li>
                    </ul>
                  </h7>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row cuadrito" style={{marginBottom: '10px'}}>
                <h3>Miembros de Equipo</h3>
                <div className="elemento">
                  <div style={{display: 'flex'}}>
                    <img src="/img/fotogabo.jpg" style={{ borderRadius: '50%', width: '25px', height: '25px' , marginRight: '10px'}}></img>
                    <h5>Elon Mosca</h5>
                  </div>
                  <h7 style={{marginLeft: '35px'}}>Software Developer</h7>
                </div>
                <div className="elemento">
                  <div style={{display: 'flex'}}>
                    <img src="/img/fotogabo.jpg" style={{ borderRadius: '50%', width: '25px', height: '25px' , marginRight: '10px'}}></img>
                    <h5>Julietota Jimenez</h5>
                  </div>
                  <h7 style={{marginLeft: '35px'}}>UI/UX Lead</h7>
                </div>
                <div className="elemento">
                  <div style={{display: 'flex'}}>
                    <img src="/img/fotogabo.jpg" style={{ borderRadius: '50%', width: '25px', height: '25px' , marginRight: '10px'}}></img>
                    <h5>Gepeto Ruiz</h5>
                  </div>
                  <h7 style={{marginLeft: '35px'}}>Sr. Software Architect</h7>
                </div>
                <div className="elemento">
                  <div style={{display: 'flex'}}>
                    <img src="/img/fotogabo.jpg" style={{ borderRadius: '50%', width: '25px', height: '25px' , marginRight: '10px'}}></img>
                    <h5>Fulano Detal</h5>
                  </div>
                  <h7 style={{marginLeft: '35px'}}>Project Manager</h7>
                </div>
              </div>
              <div className="row cuadrito">
                <h4>Habilidades Necesarias</h4>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '2px'}}>
                  <a href="#" className="btn btn-secondary">C++</a>
                  <br></br>
                  <a href="#" className="btn btn-secondary">Agile</a>
                  <br></br>
                  <a href="#" className="btn btn-secondary">AI</a>
                  <br></br>
                  <a href="#" className="btn btn-secondary">Human Resources</a>
                  <br></br>
                  <a href="#" className="btn btn-secondary">Teamwork</a>
                  <br></br>
                  <a href="#" className="btn btn-secondary">Business Intelligence</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
