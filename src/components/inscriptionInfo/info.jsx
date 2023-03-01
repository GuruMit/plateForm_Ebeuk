import React from 'react'

//
import css from './info.module.css'

 export const InfoFournisseur = () => {
  return (
    <>
    <div className={css.info_fournissieur}>

    <h3>Trouver des Clients , Prestez Plus</h3>
    <hr />
    <p>Cree votre compte sur Ebeuk et <br/> beneficier des avantages
       suivantes :
    </p>

    <ul>
        <li>Gagnez en visibilité</li>
        <li>Vendez des Prestation</li>
        <li>Augmenter votre chiffre d'affaire</li>
        <li>Contactez des Clients</li>
        <li>Passer moins de temps a demarcher pour vos services</li>
    </ul>
    
    <p>
        La creation d'un compte est gratuite
    </p>

    </div>
 
    
    </>
  )
}

export const InfoClient = () => {
    return (
      <>
      <div className={css.info_fournissieur}>
  
      <h3>Compte Client </h3>
      <hr />
      <p>Le compte client vous permet 
       de trouvers des prestaires <br/> disponible dans la 
       plateforme pour tout type d'evenment 
      </p>

      <p>Vous pouvez :</p>
  
      <ul>
          <li>Publier des Annonces</li>
          <li>Acheter directement une prestation</li>
          <li>Echanger avec vos prestataires pour le suivi d'un projet</li>
          <li>Demandez un Devis et un expert vous repondras </li>
      </ul>
      
      <p>
          La creation d'un compte est gratuite
      </p>
  
      </div>
   
      
      </>
    )
  }