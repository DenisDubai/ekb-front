import '../App.less';
import { useState } from 'react';

export function Main() {

    const onSelectColumns = item => {
        getFilters({ categoryId: item?.key, page: 0 }).then(resp=> {setFilters(resp); setSpinning(false); setSpinningRes(false)} )
    }

}