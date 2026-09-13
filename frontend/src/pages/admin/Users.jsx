import { useState } from 'react';
import { Search, MapPin, Trash2, Eye, RefreshCw, UserCheck, UserX, Shield } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import * as userService from '../../services/userService';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';

export const Users = () => {
  const { users, setUsers, deleteUser, toggleUserActive, showToast, refreshData, loading, isLiveDatabase } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  const handleDeleteUser = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove user "${name}"?`)) {
      if (deleteUser) {
        await deleteUser(id);
      } else {
        try {
          await userService.deleteUser(id);
          if (setUsers) setUsers((prev) => prev.filter((u) => u.id !== id && u._id !== id));
          showToast(`User ${name} removed.`, 'info');
        } catch (err) {
          showToast(`Failed to delete user: ${err.message}`, 'error');
        }
      }
      if (selectedUser && (selectedUser.id === id || selectedUser._id === id)) {
        setSelectedUser(null);
      }
    }
  };

  const handleToggleActive = async (user) => {
    const userId = user.id || user._id;
    const newActiveState = user.status === 'Deactivated' || user.isActive === false;
    if (toggleUserActive) {
      await toggleUserActive(user);
    } else {
      try {
        await userService.updateUser(userId, { isActive: newActiveState });
        if (setUsers) {
          setUsers((prev) =>
            prev.map((u) =>
              u.id === userId || u._id === userId
                ? { ...u, isActive: newActiveState, status: newActiveState ? 'Active' : 'Deactivated' }
                : u
            )
          );
        }
        showToast(`User ${user.name} is now ${newActiveState ? 'Active' : 'Deactivated'}.`, 'success');
      } catch (err) {
        showToast(`Failed to update status: ${err.message}`, 'error');
      }
    }
    if (selectedUser) {
      setSelectedUser((prev) => ({
        ...prev,
        isActive: newActiveState,
        status: newActiveState ? 'Active' : 'Deactivated'
      }));
    }
  };

  const filteredUsers = users.filter((u) => {
    const roleStr = (u.role || '').toLowerCase();
    const filterLower = roleFilter.toLowerCase();
    const matchesRole = roleFilter === 'All' || roleStr.includes(filterLower);

    const matchesSearch =
      (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.location || '').toLowerCase().includes(searchTerm.toLowerCase());

    return matchesRole && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--forest-900)' }}>
            Registered Cultural Enthusiasts & Patrons
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Directory of art learners, institutional collectors, and cultural researchers supporting Indian heritage.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing || loading}
          className="btn btn-secondary"
          style={{ padding: '7px 14px', fontSize: '12.5px' }}
        >
          <RefreshCw size={14} className={isRefreshing ? 'spin-animation' : ''} />
          <span>Sync Users</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="filter-bar">
        <div className="filter-group">
          <button
            onClick={() => setRoleFilter('All')}
            className={`filter-pill ${roleFilter === 'All' ? 'active' : ''}`}
          >
            All Users ({users.length})
          </button>
          <button
            onClick={() => setRoleFilter('learner')}
            className={`filter-pill ${roleFilter === 'learner' ? 'active' : ''}`}
          >
            Learners & Students
          </button>
          <button
            onClick={() => setRoleFilter('artisan')}
            className={`filter-pill ${roleFilter === 'artisan' ? 'active' : ''}`}
          >
            Artisans
          </button>
          <button
            onClick={() => setRoleFilter('admin')}
            className={`filter-pill ${roleFilter === 'admin' ? 'active' : ''}`}
          >
            Nodal Admins
          </button>
        </div>

        <div className="search-input-wrapper">
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            placeholder="Search by name, email, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Cultural Patron</th>
              <th>Community Role</th>
              <th>Location</th>
              <th>Created Date</th>
              <th>Account Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-secondary)' }}>
                  No patrons found matching your search.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => {
                const userId = u.id || u._id;
                const createdDate = u.createdAt
                  ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                  : u.date || u.joined || 'Aug 2026';

                return (
                  <tr key={userId}>
                    <td>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--forest-900)' }}>{u.name}</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{u.email}</div>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          background: u.role === 'admin' ? '#fee2e2' : u.role === 'artisan' ? '#fef3c7' : 'var(--beige-200)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          color: u.role === 'admin' ? '#991b1b' : u.role === 'artisan' ? '#92400e' : 'var(--forest-800)',
                          textTransform: 'capitalize'
                        }}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px' }}>
                        <MapPin size={13} color="var(--terracotta-500)" />
                        <span>{u.location || 'India'}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{createdDate}</span>
                    </td>
                    <td>
                      <StatusBadge status={u.status || (u.isActive !== false ? 'Active' : 'Deactivated')} />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setSelectedUser(u)}
                          title="View Profile"
                          style={{ padding: '6px 10px' }}
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleToggleActive(u)}
                          title={u.status === 'Deactivated' ? 'Activate account' : 'Deactivate account'}
                          style={{ padding: '6px 10px' }}
                        >
                          {u.status === 'Deactivated' ? <UserCheck size={13} color="#166534" /> : <UserX size={13} color="#dc2626" />}
                        </button>
                        {u.role !== 'admin' && (
                          <button
                            className="btn btn-reject"
                            onClick={() => handleDeleteUser(userId, u.name)}
                            title="Delete User"
                            style={{ padding: '6px 10px' }}
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <Modal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          title={`User Profile: ${selectedUser.name}`}
          footer={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => handleToggleActive(selectedUser)}
              >
                {selectedUser.status === 'Deactivated' ? 'Activate User' : 'Deactivate User'}
              </button>
              {selectedUser.role !== 'admin' && (
                <button
                  className="btn btn-reject"
                  onClick={() => handleDeleteUser(selectedUser.id || selectedUser._id, selectedUser.name)}
                >
                  <Trash2 size={14} />
                  <span>Delete User</span>
                </button>
              )}
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
            </>
          }
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--forest-100)',
                color: 'var(--forest-900)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 700
              }}
            >
              {selectedUser.name ? selectedUser.name[0] : 'U'}
            </div>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--forest-900)' }}>
                {selectedUser.name}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{selectedUser.email}</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <span style={{ fontSize: '11px', background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  {selectedUser.role}
                </span>
                <StatusBadge status={selectedUser.status || (selectedUser.isActive !== false ? 'Active' : 'Deactivated')} />
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px',
              fontSize: '12.5px'
            }}
          >
            <div style={{ background: 'var(--beige-50)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>PHONE</span>
              <strong>{selectedUser.phone || 'Not provided'}</strong>
            </div>
            <div style={{ background: 'var(--beige-50)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>LOCATION</span>
              <strong>{selectedUser.location || 'India'}</strong>
            </div>
            <div style={{ background: 'var(--beige-50)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>REGISTRATION DATE</span>
              <strong>
                {selectedUser.createdAt
                  ? new Date(selectedUser.createdAt).toLocaleDateString('en-IN')
                  : 'Aug 2026'}
              </strong>
            </div>
            <div style={{ background: 'var(--beige-50)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px' }}>ACCOUNT STATUS</span>
              <strong style={{ color: selectedUser.isActive !== false ? '#166534' : '#991b1b' }}>
                {selectedUser.isActive !== false ? 'Active & Verified' : 'Deactivated'}
              </strong>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Users;
