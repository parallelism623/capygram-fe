import './Options.scss'

const Options = ({ oncancel }) => {
    return (
        <div className='option'>
            <div className="options-list"><p style={{ fontWeight: 'bold', color: 'rgb(207, 57, 85)' }}>Báo cáo</p></div>
            <div className="options-list"><p>Đi đến bài viết</p></div>
            <div className="options-list"><p>Chia sẻ lên...</p></div>
            <div className="options-list"><p>Sao chép liên kết</p></div>
            <div className="options-list"><p>nhúng</p></div>
            <div className="options-list"><p>Giới thiệu về tài khoản này</p></div>
            <div className="options-list" style={{ borderBottom: '0' }}><p onClick={oncancel}>Hủy</p></div>
        </div>
    )
}
export default Options