import * as artisanService from './artisanService';

/**
 * Artist Service (Alias of artisanService)
 * Supports /artists pages and terminology as requested in prompt.
 */

export const getArtists = artisanService.getArtisans;
export const getArtistById = artisanService.getArtisanById;
export const createArtist = artisanService.createArtisan;
export const updateArtist = artisanService.updateArtisan;
export const approveArtist = artisanService.approveArtisan;
export const rejectArtist = artisanService.rejectArtisan;
export const deleteArtist = artisanService.deleteArtisan;

export default artisanService;
