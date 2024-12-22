import { DestinationCoordinatesContext } from '@/context/DestinationCoordinates'
import { SourceCoordinatesContext } from '@/context/SourceCoordinats'
import React, { useContext, useEffect, useState } from 'react'
const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve/"
const access_token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
import { v4 as uuidv4 } from 'uuid'
const AutoAddress = () => {
    const sessionToken = uuidv4();
    const [source, setSource] = useState<any>();
    const [sourceChanges, setSourceChanges] = useState<any>(false);
    const { setSourceCoordinates } = useContext(SourceCoordinatesContext);
    const { setDestinationCoordinates } = useContext(DestinationCoordinatesContext);
    const [destinations, setDestinations] = useState<any>();
    const [destinationChange, setDestinationChanges] = useState<any>(false)
    const [addressList, setAddressList] = useState<any>([]);

    useEffect(() => {
        if (!source) {
            setAddressList([])
            return;
        };
        const DelayDebounceFn = setTimeout(() => {
            getAddressList();
        }, 1000);
        return () => clearTimeout(DelayDebounceFn)
    }, [source, destinations])
    async function getAddressList() {
        const query = sourceChanges ? source : destinations
        const res = await fetch(`/api/search-add?q=${query}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await res.json();
        setAddressList(result || [])
    }
    async function onSourceAddressClick(item: any) {
        setSource(item.full_address);
        setAddressList([]);
        setSourceChanges(false);
        const access_token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        const res = await fetch(`${BASE_URL}${item.mapbox_id}?session_token=${sessionToken}&access_token=${access_token}`);

        const result = await res.json();
        setSourceCoordinates({
            long: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1],
        })
    }
    async function onDestinationAddressClick(item: any) {
        setDestinations(item.full_address);
        setAddressList([]);
        setDestinationChanges(false);
        const res = await fetch(`${BASE_URL}${item.mapbox_id}?session_token=${sessionToken}&access_token=${access_token}`);

        const result = await res.json();

        setDestinationCoordinates({
            long: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1]
        })
    }
    return (
        <div className='mt-1'>
            <div className='relative'>
                <label>Where From ?</label>
                <input value={source || ''}
                    onChange={e => { setSource(e.target.value); setSourceChanges(true) }} type="text" placeholder='Enter Current Address' className='bg-white p-1 w-full border-[1px]
                 focus:border-red-900 outline-none rounded-lg focus:bg-slate-100 ' />
                {
                    addressList?.suggestions && sourceChanges ?
                        <div className='shadow-md rounded-md p-1 absolutes' >
                            {
                                addressList?.suggestions.map((item: any, index: number) => (
                                    <h2 onClick={() => { onSourceAddressClick(item) }} className='p-2 hover:bg-green-200 rounded-md w-full cursor-pointer' key={index}>{item.full_address}</h2>
                                ))
                            }
                        </div> : null
                }
            </div>
            <div>
                <label>Where To ?</label>
                <input
                    type="text"
                    placeholder='Enter Current Address'
                    value={destinations || ''}
                    onChange={e => { setDestinations(e.target.value); setDestinationChanges(true) }}
                    className='bg-white p-1 w-full border-[1px]
                 focus:border-red-900 outline-none rounded-lg focus:bg-slate-100 text-black' />
                {
                    addressList?.suggestions && destinationChange ?
                        <div className='shadow-md rounded-md p-1 absolutes'>
                            {
                                addressList?.suggestions.map((item: any, index: number) => (
                                    <h2 onClick={() => { onDestinationAddressClick(item) }} className='p-2 hover:bg-green-200 rounded-md w-full cursor-pointer' key={index}>{item.full_address}</h2>
                                ))
                            }
                        </div> : null
                }
            </div>
        </div>
    )
}

export default AutoAddress