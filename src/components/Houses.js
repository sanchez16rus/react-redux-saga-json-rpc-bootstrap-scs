import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import Actions from '../actions';

class Houses extends Component {

    constructor(props) {
        super(props)
        
        this.lazyLoadClick = this.lazyLoadClick.bind(this);
      }

      componentWillMount() {
        this.props.dispatch(Actions.getHousesListAction());
      }
      
      lazyLoadClick(e) {
        this.props.dispatch(Actions.getHousesListLazyAction(this.props.counterInfo));
      }

    renderLoader(isLoaded) {
        let buttonText = isLoaded ? 'Загрузить еще' : 'Идет загрузка';
        return <button className="btn btn-primary button_loader" disabled = {!isLoaded} onClick={(e) => this.lazyLoadClick(e)}>{buttonText}</button>;
    }

    render() {
    
        const { isLoaded, houses, counterInfo } = this.props;

        let items = houses.map((item) => {
    
            return (
            <div className="col-md-4 col-lg-4" key={item.id}>
                <div className="card">
                    <img alt="Card image cap" className="card-img-top img-fluid" src={item.img} />
                    <div className="card-img-overlay sub-info">
                        <h5 className="card-title">{item.caption}</h5>
                        <h6 className="card-title">{item.address}</h6>
                        <h6 className="card-title">{item.delivery}</h6>
                        <p className="card-text">Количество квартир: {item.flats_count}</p>
                        <p className="card-text">Мин кв.м.: {item.sqm_min}</p>
                        <p className="card-text">Макс кв.м.: {item.sqm_max}</p>
                        <p className="card-text">Стоимость от: {item.price_min} р.</p>
                    </div>
                </div>
            </div>
                );
            });
  
      return (
      <div className="container">
          
        <h1 className="display-4 text-xs-center m-y-3 text-muted" id="speakers">Новостройки</h1>
        
            {
                !isLoaded ? 
                <h5 className="text-muted">Идет загрузка...</h5> :
                <h5 className="text-muted">Отображено {houses.length} из {counterInfo.count}</h5>
            }
        
        <div className="row">
          {items}
        </div>
        <div className="div_center">
            {
                houses.length != counterInfo.count?
                this.renderLoader(isLoaded) : ''
            }
        </div>
        <div className="div_center">
        {
            !isLoaded ? 
            ' ' :
            <h5 className="text-muted">Отображено {houses.length} из {counterInfo.count}</h5>
        }
        </div>     
      </div>
      );
  }
};

Houses.propTypes = {
    isLoaded: PropTypes.any.isRequired,
    houses : PropTypes.any.isRequired,
    counterInfo: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  
  const mapStateToProps = (state) => (
  {
    houses: state.houses,
    counterInfo: state.counterInfo,
    isLoaded: state.isLoaded
  })
  
export default connect(mapStateToProps)(Houses);